import * as dat from 'dat.gui';

window.onload = function() {

  
    // the DICOM files
    var _dicom = [
                  'IM-0001-0001'];
    
    for (let i = 2; i < 10; i++) {
      _dicom.push('IM-0001-000'+ i.toString());
    }
    for (let i = 10; i <= 60; i++) {
      _dicom.push('IM-0001-00'+ i.toString());
    }
    
    // Create a 2d renderer
    var sliceX = new X.renderer2D();
    sliceX.container = 'container';
    sliceX.orientation = 'Z';
    sliceX.init();

    // we create the X.volume container and attach all DICOM files
    var volume = new X.volume();
    // map the data url to each of the slices
    volume.file = _dicom.sort().map(function(v) {
        // we also add the 'fake' .DCM extension since else wise
        // XTK would think .org is the extension
        return 'http://localhost:8081/jy_data/jy_data/Anon_Study - 0/Myo_PC_Series_25/' + v + '.dcm';
    });

    // map the data url to each of the slices
    volume.file = _dicom.sort().map(function(v) {  
      // we also add the 'fake' .DCM extension since else wise
      // XTK would think .org is the extension
      return 'http://localhost:8081/jy_data/jy_data/Anon_Study - 0/Myo_PC_Series_25/' + v + '.dcm';
      
    });

    // add the volume
    sliceX.add(volume);
    sliceX.render();

    // THE GUI
    //
    // the onShowtime method gets executed after all files were fully loaded and
    // just before the first rendering attempt
    sliceX.onShowtime = function() {
        var gui = new dat.GUI();

        var volumegui = gui.addFolder('Volume');

        // .. and the threshold in the min..max range
        volumegui.add(volume, 'lowerThreshold',
            volume.min, volume.max);
        volumegui.add(volume, 'upperThreshold',
            volume.min, volume.max);
        volumegui.add(volume, 'indexZ', 0,
            volume.dimensions[0] - 1);
        volumegui.open();
    };
  };
  