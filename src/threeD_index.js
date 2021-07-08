import * as dat from 'dat.gui';

window.onload = function() {

  
    // the DICOM files
    // var _dicom = ['IM-0001-0001','IM-0001-0051'];
    var _dicom = [];

    // for (let i = 2; i < 20; i++) {
    //   _dicom.push('IM-0001-0'+ (i*50+1).toString());
    // }

    for (let i = 0; i < 516; i++) {
        _dicom.push('I'+ (i).toString());
    }
  
    console.log(_dicom);
      
    // create a new test_renderer
    var r = new X.renderer3D();
    r.container = 'container';
    r.init();
    
    // we create the X.volume container and attach all DICOM files
    var volume = new X.volume();
    // map the data url to each of the slices
    volume.file = _dicom.sort().map(function(v) {
      // we also add the 'fake' .DCM extension since else wise
      // XTK would think .org is the extension
    //   return 'http://localhost:8081/jy_data/jy_data/4D FLOW/Amigo 1/Camcmorphv - 3983/4D_Flow_SAG_210/'
    //    + v + '.dcm';
        return 'http://localhost:8081/jy_data/jy_data/Class 3 malocclusion/DICOM/'+ v;
    });


    // add the volume
    r.add(volume);
    
    // setup the camera
    r.camera.position = [-150, -50, 500];
    r.camera.up = [0, -1, 0];
    
    // .. and render it
    r.render();
    
    r.onShowtime = function() {
  
    // activate volume rendering
    volume.volumeRendering = true;
    volume.lowerThreshold = 20;
    volume.windowLower = 20;
    volume.windowHigh = 360;
    volume.minColor = [0, 0.06666666666666667, 1];
    volume.maxColor = [0.5843137254901961, 1, 0];
    volume.opacity = 0.2;

    var gui = new dat.GUI();

    var volumegui = gui.addFolder('Volume');

    // .. and the threshold in the min..max range
    volumegui.add(volume, 'lowerThreshold',
        volume.min, volume.max);
    volumegui.add(volume, 'upperThreshold',
        volume.min, volume.max);
    // volumegui.add(volume, 'volindex',
    // 0, 2000);
    volumegui.open();
      
    };
  };
  