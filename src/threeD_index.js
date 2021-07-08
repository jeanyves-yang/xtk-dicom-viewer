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
    
    console.log(_dicom);
  
    // create a new test_renderer
    var r = new X.renderer3D();
    r.init();
    
    // we create the X.volume container and attach all DICOM files
    var v = new X.volume();
    // map the data url to each of the slices
    v.file = _dicom.sort().map(function(v) {
  
      // we also add the 'fake' .DCM extension since else wise
      // XTK would think .org is the extension
      return 'http://localhost:8081/jy_data/jy_data/Anon_Study - 0/Myo_PC_Series_25/' + v + '.dcm';
      
    });
    
    // add the volume
    r.add(v);
    
    // setup the camera
    r.camera.position = [-150, -50, 500];
    r.camera.up = [0, -1, 0];
    
    // .. and render it
    r.render();
    
    r.onShowtime = function() {
  
      // activate volume rendering
      v.volumeRendering = true;
      v.lowerThreshold = 20;
      v.windowLower = 115;
      v.windowHigh = 360;
      v.minColor = [0, 0.06666666666666667, 1];
      v.maxColor = [0.5843137254901961, 1, 0];
      v.opacity = 0.2;
      
    };
    
    volume = v;
    
  };
  