# LandscapeClassification
Zhendong Cao, Phil Wernette, Jaap Nienhuis

## Objective
Apply image classification (https://developers.google.com/earth-engine/guides/classification) and image segmentation (https://en.wikipedia.org/wiki/Image_segmentation) to obtain landform characteristics of river deltas

## Approach
Use Google Earth Engine in python, with Jupyter notebooks running in Google Colab, shared in Google Drive

1. Image classification
Use supervised ML techniques to train a classifier to identify deltas https://colab.research.google.com/github/giswqs/geemap/blob/master/examples/notebooks/32_supervised_classification.ipynb
Needs training dataset (pick cells we know are deltas)
Needs data to source (collect rasters that we think will predict delta occurrence) 
2. Image segmentation
Use objective based methods to link neighbouring river delta pixels
https://developers.google.com/earth-engine/guides/image_objects
