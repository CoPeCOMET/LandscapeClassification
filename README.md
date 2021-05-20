# Landscape Classification
Zhendong Cao, Phil Wernette, Jaap Nienhuis

(scroll down for action items/tasks)

## Objective
Apply image classification (https://developers.google.com/earth-engine/guides/classification) and image segmentation (https://en.wikipedia.org/wiki/Image_segmentation) to obtain landform characteristics of river deltas using Google Earth Engine code and available data.

## Approach
Use Google Earth Engine in python, with Jupyter notebooks running in Google Colab, shared in Google Drive

1. Image classification
Use supervised ML techniques to train a classifier to identify deltas https://colab.research.google.com/github/giswqs/geemap/blob/master/examples/notebooks/32_supervised_classification.ipynb
Needs training dataset (pick cells we know are deltas)
Needs data to source (collect rasters that we think will predict delta occurrence) 
2. Image segmentation
Use objective based methods to link neighbouring river delta pixels
https://developers.google.com/earth-engine/guides/image_objects

## Datasets
- Elevation: MERIT DEM: Multi-Error-Removed Improved-Terrain DEM (https://developers.google.com/earth-engine/datasets/catalog/MERIT_DEM_v1_0_3)
- Imagery: Landsat 8 Tier 1 (https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC08_C01_T1_SR)
- Land Cover: NLCD: USGS National Land Cover Database (https://developers.google.com/earth-engine/datasets/catalog/USGS_NLCD_RELEASES_2016_REL)
- Lithology (https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_US_lithology)
- Topographic Diversity: Global SRTM Topographic Diversity (https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_US_topoDiversity)

## Programs/Languages
- Google Earth Engine
- Google Colab Notebooks
- Python

# TASKS
- Download EE datasets available for Gulf of Mexico relevant to coastal deltas.
- Create training dataset of known/identified deltas and non-deltas.
- Develop ML script to (1) train segmentation using 70/30 training/validation split, and (2) segment new imagery to identify deltas.
  - EarthEngine classifier?
  - Tensorflow classifier?
