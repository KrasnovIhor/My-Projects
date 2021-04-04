import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { SRLWrapper } from "simple-react-lightbox";

const Gallery = ({ photos }) => {
  const options = {
    settings: {
      disablePanzoom: true,
      disableKeyboardControls: true,
      disableWheelControls: true,
    },
    buttons: {
      showAutoplayButton: false,
      showCloseButton: false,
      showDownloadButton: false,
      showFullscreenButton: false,
      showNextButton: false,
      showPrevButton: false,
      showThumbnailsButton: false,
    },
    caption: {
      showCaption: false,
    },
    thumbnails: {
      showThumbnails: false,
    },
  };

  return (
    <div className="container">
      <SRLWrapper options={options}>
        <GridList cellHeight={150} cols={5}>
          {photos.map(
            (
              {
                urls: { regular: url },
                alt_escription: altDescription,
                description,
                user: { name: userName },
              },
              index
            ) => (
              <GridListTile>
                <img key={index} src={url} alt={altDescription} />
                <GridListTileBar title={description} subtitle={userName} />
              </GridListTile>
            )
          )}
        </GridList>
      </SRLWrapper>
    </div>
  );
};

export default Gallery;
