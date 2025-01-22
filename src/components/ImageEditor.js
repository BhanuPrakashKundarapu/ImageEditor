import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import "./ImageStyle.css"
function ImageEditor({ imageUrl }) {
  const canvasWidth = window.innerWidth * 0.83; // 80% of the viewport width
const canvasHeight = canvasWidth /2; 
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
    });
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas && imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        img.scale(scale);
        
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          originX: 'center',
          originY: 'center',
          left: canvas.width/2 ,
          top: canvas.height/2 ,
        });
      }, { crossOrigin: 'anonymous' }); // Add this line
    }
  }, [canvas, imageUrl]);
  // useEffect(() => {
  //   if (canvas && imageUrl) {
  //     fabric.Image.fromURL(imageUrl, (img) => {
  //       // Scale image to fit canvas
  //       const scale = Math.min(
  //         canvas.width / img.width,
  //         canvas.height / img.height
  //       );
  //       img.scale(scale);
        
  //       canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
  //         originX: 'center',
  //         originY: 'center',
  //         left: canvas.width / 2,
  //         top: canvas.height / 2,
  //       });
  //     });
  //   }
  // }, [canvas, imageUrl]);

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText('Double click to edit', {
      left: 100,
      top: 100,
      fontSize: 20,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    updateLayers();
  };

  const addShape = (type) => {
    if (!canvas) return;
    let shape;

    switch (type) {
      case 'rectangle':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: 'rgba(255, 0, 0, 0.5)',
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: 'rgba(0, 255, 0, 0.5)',
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: 'rgba(0, 0, 255, 0.5)',
        });
        break;
      default:
        return;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    updateLayers();
  };

  const updateLayers = () => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    setLayers(objects.map((obj, index) => ({
      id: index,
      type: obj.type,
      text: obj.type === 'i-text' ? obj.text : undefined,
    })));
  };


  // const downloadImage = () => {
  //   if (!fabricCanvas.current) return;
  //   const dataUrl = fabricCanvas.current.toDataURL({ format: 'png' });
  //   const link = document.createElement('a');
  //   link.href = dataUrl;
  //   link.download = 'modified-image.png';
  //   link.click();

  // };

  const downloadImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataURL;
    link.click();
  };

  const resetCanvas = () => {
    if (!canvas) return;
    canvas.getObjects().forEach((obj) => {
      canvas.remove(obj);
    });
    updateLayers();
  };

  return (
    <div className="image-editor">
      

      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
     

      <div>
      <button onClick={addText} className='user-actions'>Add Text</button>
      <div  className="layers-panel">
        <h3>Layers</h3>
        <ul>
          {layers.map((layer) => (
            <li key={layer.id} className='layers-li'>
              {layer.type} {layer.text ? `- "${layer.text}"` : ''}
            </li>
          ))}
        </ul>
        </div>
        <button onClick={downloadImage} className='user-actions'>Download</button>

      </div>
      <div className="toolbar">
        
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('triangle')}>Add Triangle</button>
        <button onClick={resetCanvas}>Reset Canvas</button>
      </div>
    </div>
  );
}

export default ImageEditor;