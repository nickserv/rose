import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { writeFile } from 'mz/fs'
import { parse, resolve } from 'url'

// Scrape all technology names from a table header row.
export function scrapeTechnologies ($tr, $) {
  var technologies = []
  $tr.find('th').each(function (index) {
    if (index > 0) {
      // Get the name of the technology, removing the year.
      var technology = $(this).text().replace(/\s*\(\d{4}\)/, '')
      technologies.push(technology)
    }
  })
  return technologies
}

// Scrape a feature from a table row.
export function scrapeFeature ($tr, $, technologies) {
  var feature = { examples: [] }
  $tr.find('td').each(function (index) {
    var text = $(this).text()

    // Get feature data.
    if (index === 0) {
      // Get the name of the feature.
      feature.name = text
    } else if (text) {
      // Collect the cell data as one example.
      feature.examples.push({
        technology: technologies[index - 1],
        snippet: text
      })
    }
  })
  return feature.examples.length ? feature : undefined
}

// Scrape all features from a table.
export function scrapeTable ($table, $) {
  var features = []
  var technologies = []

  $table.find('tr').each(function (index) {
    if ($(this).find('th').length > 1) {
      var newTechnologies = scrapeTechnologies($(this), $)

      // Hard coded fix for an issue with Hyperpolyglot's page on MATLAB
      if (technologies.indexOf('matlab') === -1) {
        technologies = newTechnologies
      }
    } else {
      if ($(this).find('td').first().text()) {
        var feature = scrapeFeature($(this), $, technologies)
        if (feature) {
          features.push(feature)
        }
      }
    }
  })

  return features
}

// Gets a list of all Rosetta Stone pages from http://hyperpolyglot.org/.
export function getPages () {
  return fetch('http://hyperpolyglot.org/')
    .then(response => response.text())
    .then(function (body) {
      var links = []
      var $ = cheerio.load(body)
      $('a').each(function () {
        var currentHREF = $(this).attr('href')
        var currentURL = parse(currentHREF)
        if (!currentURL.host && currentURL.path !== '/') {
          links.push(resolve('http://hyperpolyglot.org/', currentHREF))
        }
      })
      return links
    })
}

export function scrapePage (link) {
  return fetch(link)
    .then(response => response.text())
    .then(function (body) {
      var $ = cheerio.load(body)

      // Find the first table.
      return scrapeTable($('.wiki-content-table').first(), $)
    })
}

// Scrape features from the Hyperpolyglot website.
export function scrape () {
  return getPages().then(function (links) {
    // TODO: Don't blacklist these pages
    links = links.filter(function (link) {
      return link.indexOf('/text-mode-editors') === -1
    })

    return Promise.all(links.map(scrapePage))
  }).then(function (featureSets) {
    return Array.prototype.concat.apply([], featureSets)
  }).catch(console.error)
}

export function load () {
  return scrape()
    .then(values => writeFile('dist/features.json', JSON.stringify(values)))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

if (!module.parent) load()
