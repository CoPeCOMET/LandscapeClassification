# Landscape Classification (CoPe COMET sprint)
Zhendong Cao, Phil Wernette, Jaap Nienhuis

## Objective
Apply image classification (see https://developers.google.com/earth-engine/guides/classification) and image segmentation (see https://en.wikipedia.org/wiki/Image_segmentation) to obtain landform characteristics of river deltas using Google Earth Engine code and available data.

## Approach
Use the Google Earth Engine (EE) Python API with Jupyter notebooks running in Google Colab to subset EE datasets of interest, and (1) train a machine learning model (Supervised Classification) to obtain pixel-level probabilities of river delta deposits. (2) Apply connected components algorithms to group neighbouring pixels of high delta likelihood together retrieve delta landform statistics.

1. **Image classification**
Use supervised ML techniques to train a classifier to identify deltas https://colab.research.google.com/github/giswqs/geemap/blob/master/examples/notebooks/32_supervised_classification.ipynb
Needs training dataset (pick cells we know are deltas)
Needs data to source (collect rasters that we think will predict delta occurrence) 

2. **Image segmentation**
Use connected components object-based methods to group delta pixels https://developers.google.com/earth-engine/guides/image_objects
Needs output from image classification

### Area of Interest
![sample aoi](/images/sample_map.PNG)

### Input Datasets (subject to change)
- Elevation: MERIT DEM: Multi-Error-Removed Improved-Terrain DEM (https://developers.google.com/earth-engine/datasets/catalog/MERIT_DEM_v1_0_3)

![elevation map](/images/mdem.PNG)
- Imagery: Landsat 8 Tier 1 (https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC08_C01_T1_SR)
    - Includes ALL available bands

![landcover8 tier 1 imagery](/images/l8fc.PNG)
- Land Cover: NLCD: USGS National Land Cover Database (https://developers.google.com/earth-engine/datasets/catalog/USGS_NLCD_RELEASES_2016_REL)

![landcover map](/images/landcover.PNG)
- Soil Great Groups: OpenLandMap USDA soil taxonomy great groups (https://developers.google.com/earth-engine/datasets/catalog/OpenLandMap_SOL_SOL_GRTGROUP_USDA-SOILTAX_C_v01)

![soil great groups map](/images/sgg.PNG)
- Soil Organic Carbon Content: OpenLandMap Soil organic carbon content (https://developers.google.com/earth-engine/datasets/catalog/OpenLandMap_SOL_SOL_ORGANIC-CARBON_USDA-6A1C_M_v02)
- Soil Water Content: OpenLandMap Soil water content at 33kPa (field capacity) (https://developers.google.com/earth-engine/datasets/catalog/OpenLandMap_SOL_SOL_WATERCONTENT-33KPA_USDA-4B1C_M_v01)
    - Available Depths: 0cm, 30 cm, 60 cm, 100cm, 200cm

![soil water content map](/images/sm30cm.PNG)
- Topographic Diversity: Global SRTM Topographic Diversity (https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_Global_SRTM_topoDiversity)

![topographic diversity index map](/images/tdi.PNG)

![segmented deltas based on preliminary classification data](/images/object_method_1.PNG)

![vectorized delta polygons](/images/object_method_2.PNG)

### Programs/Languages
- Google Colab Notebooks
- Google Earth Engine
- Python

# TASKS
- [x] Develop code to pull available datasets for Gulf of Mexico relevant to coastal deltas. (option is available to download the data to your Google Drive, if desired)
- [x] Create training dataset of known/identified deltas and non-deltas.
- [x] Create segmentation algorithm based on binary delta-nondelta pixels
- [x] Reduce segmented deltas to vectors
- [ ] Develop ML script to (1) train segmentation using 70/30 training/validation split, and (2) segment new imagery to identify deltas.
    - EE classifier?
    - TF classifier?
- [ ] Join resulting data polygons with feeder river data

