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
LOAD SOIL GREAT GROUP
*/
var sgg = ee.Image("OpenLandMap/SOL/SOL_GRTGROUP_USDA-SOILTAX_C/v01")
              .select('grtgroup')
              .clip(gompoly);
var sggvis = {
  bands: ['grtgroup'],
  min: 0.0,
  max: 433.0,
  palette: [
    "FFFFFF","ADFF2D","ADFF22","A5FF2F","87FF37","BAF019",
    "87FF19","96F03D","A3F52F","AFF319","91FF37","9CF319",
    "9BFF37","91FF19","71FF37","86FF19","A9D42D","AFF519",
    "9BFF19","9AF024","A5FD2F","88FF37","AFED19","71FF19",
    "AFF026","8CF537","B7FF19","7177C0","9A85EC","F5F5E1",
    "52CF5A","E42777","4EF76D","FF00FB","EB05EB","FA04FA",
    "FC04F5","F50DF0","F118F1","FA0CFA","FC05E1","F100D5",
    "EB09E6","FA22FA","FFDAB9","F5D2BB","E8C9B8","FFDDC4",
    "E7CBC0","FFD2C3","F5D6BB","D5D3B9","E8D4B8","E7CDC0",
    "F3EAC8","A0C4BA","FFD2B9","F5DABB","F5D5B9","E8EBB8",
    "FFDDC2","E7FFC0","F3E6C8","FFDAB9","F5CDB9","A91D30",
    "796578","D8FF6E","177548","43EFD6","8496A9","296819",
    "73FFD4","6FFFC8","75FBC9","86F5D1","82FFD2","88EEC8",
    "80FFD4","6BFFC9","88EEC8","7FFFC8","81FFD2","86F0D4",
    "67FFC8","88EEC8","7FFBCB","87FFD2","8AF5CE","6BFAD2",
    "78F0D4","88EEC8","7FFBD4","73F5CD","88C8D2","91F0CD",
    "73CDD2","88EEC8","FB849B","DD4479","61388B","A52A30",
    "722328","D81419","A42828","82F5CD","A54C2E","C11919",
    "B91419","21B199","702028","B41919","B22328","A2C7EB",
    "36BA79","806797","CB5B5F","CD5C5C","D94335","D35740",
    "E05A5D","CF5B5C","CA5964","CA5D5F","CD5E5A","CA5969",
    "D95A35","D36240","E05C43","D64755","CF595C","FF5F5F",
    "CD6058","D95F35","D35140","D65A55","E05C59","CF525E",
    "C65978","F5615F","826F9A","CFF41A","4A6F31","A96989",
    "E16438","24F640","88C1F9","F5D25C","D74322","7F939E",
    "41A545","8F8340","09FE03","0AFF00","0FF30F","02F00A",
    "0FC903","17F000","0CFF00","0AC814","0CFE00","0AFF0A",
    "03FF05","1CF31C","24F000","00FF0C","14C814","00FE4C",
    "14FF96","44D205","05F305","62F00A","0FCD03","00D20F",
    "1ADD11","09FF0C","03FF05","05E700","02F00A","0FEA03",
    "00F000","0CCB0C","14DD14","6A685D","FAE6B9","769A34",
    "6FF2DF","CA7FC6","D8228F","C01BF0","D2BAD3","D8C3CB",
    "D4C6D4","D5BED5","DDB9DD","D8D2D8","D4C9D4","D2BAD5",
    "D5BAD5","D5B2D5","D8C8D2","D4CBD4","552638","2571EB",
    "FFA514","F3A502","FB7B00","F0B405","F7A80F","FB9113",
    "FFA519","F3A702","FBBA07","F7970F","F3A702","FB5A00",
    "F0C005","F7810F","FF9C00","F3B002","F0B005","F7980F",
    "4D7CFC","FFFF00","FAFA05","EBEB22","FFFF14","F1F10A",
    "FAFA05","EBEB1E","F5EB0C","EEF506","F1F129","FAFA05",
    "EBEB0C","F5D202","FFD700","F1F12B","A91FAC","2DA468",
    "9A8B71","76B989","713959",
  ]
};



/*
LOAD SOIL MOISTURE
*/
var sm = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01")
            .clip(gompoly);

// visualize soil moisture (0, 10, 30, 60, 100, 200 cm depths available)
var smvis100 = {
  bands: ['b100'],
  min: 0.0,
  max: 52.9740182135385,
  palette: [
    "d29642","eec764","b4ee87","32eeeb","0c78ee","2601b7",
    "083371",
  ]
};
var smvis30 = {
  bands: ['b30'],
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
LOAD LANDCOVER
*/
// EE location of NLCD land cover (with spatial filter)
var nlcd = ee.ImageCollection('USGS/NLCD_RELEASES/2016_REL')

// filter data to 2016 and landcover band
var nlcd2016 = nlcd.filter(ee.Filter.eq('system:index','2016')).first()
var landcover = nlcd2016.select('landcover').clip(gompoly)


/*
MAP THE INPUTS
*/
//Map.setCenter(-87.215305, 30.584818, 7);
Map.centerObject(aoipoly);
Map.addLayer(tdi, {}, 'Topographic Diversity Index (SRTM)', false);
Map.addLayer(landcover, {}, 'Landcover', false);
Map.addLayer(sgg, sggvis, 'USDA soil taxonomy great groups', false);
Map.addLayer(sm, smvis100, 'Soil Moisture at 100cm', true);
Map.addLayer(sm, smvis30, 'Soil Moisture at 30cm', true);
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