// define an input polygon area of interest (AOI)
var aoipoly = ee.Geometry.Polygon([[[-88.412770, 31.098514], [-87.015281, 31.098514], [-87.015281, 30.156911], [-88.412770, 30.156911], [-88.412770, 31.098514]]])
var gompoly = ee.Geometry.Polygon([[[-98.347274, 26.322097], [-98.238364, 28.187734], [-95.430534, 32.017493], [-84.011970, 32.564172], [-82.679402, 31.166281], [-80.410998, 24.154884], [-86.730146, 28.166929], [-94.552293, 27.623251], [-96.338964, 25.553449], [-98.347274, 26.322097]]])


/*
LOAD LANDSAT 8 TIER 1 IMAGERY

 * Function to mask clouds based on the pixel_qa band of Landsat 8 SR data.
 * @param {ee.Image} image input Landsat 8 SR image
 * @return {ee.Image} cloudmasked Landsat 8 image
 */
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}

// load L8 image collection
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2020-01-01', '2021-05-15')
                  .map(maskL8sr);

// clip the data to the AOI polygon
var l8med = l8.median().clip(gompoly);

// set the visualization parameters
var l8natural = {  // visualise natural color
  bands: ['B4','B3','B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
var l8false = {  // visualise false color composite
  bands: ['B5','B4','B3'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
var l8swir = {  // visualise SWIR
  bands: ['B7','B5','B4'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
var l8veg = {  // visualise vegetation
  bands: ['B6','B5','B4'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};


/*
LOAD SOIL MOISTURE
*/
var sm = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01")
            .clip(gompoly);

var smvisParams = {
  bands: ['b100'],   // visualize soil moisture at 100cm depth (0, 10, 30, 60, 100, 200 available)
  min: 0.0,
  max: 52.9740182135385,
  palette: [
    "d29642","eec764","b4ee87","32eeeb","0c78ee","2601b7",
    "083371",
  ]
};


/*
LOAD TOPOGRAPHIC DIVERSITY INDEX
*/
var tdi = ee.Image("CSP/ERGo/1_0/Global/SRTM_topoDiversity")
              .select('constant')
              .clip(gompoly);


/*
MAP THE INPUTS
*/
//Map.setCenter(-87.215305, 30.584818, 7);
Map.centerObject(aoipoly);
Map.addLayer(tdi, {}, 'Topographic Diversity Index (SRTM)', false);
Map.addLayer(sm, smvisParams, 'Soil Moisture at 100cm', true);
Map.addLayer(l8med, l8swir, 'Landsat 8: SWIR', false);
Map.addLayer(l8med, l8veg, 'Landsat 8: Vegetation', false);
Map.addLayer(l8med, l8false, 'Landsat 8: False Color', false);
Map.addLayer(l8med, l8natural, 'Landsat 8: True Color', false);
Map.addLayer(aoipoly, {}, 'Exploratory AOI', true, 0.4);


/*
OPTIONAL EXPORT TO GOOGLE DRIVE
*/
/*
Export.image.toDrive({
  image: dat,
  description: "test",
  scale: 30,
  region: aoipoly
})
*/