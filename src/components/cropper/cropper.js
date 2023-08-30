import React, { useState, useRef, useEffect } from "react";

export default function CropperImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const canvasRef = useRef(null);
  const selectionRect = useRef({});

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setCroppedImage(null); // Reset cropped image when selecting a new image
    }
  };

  const handleCanvasMouseDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectionRect.current = { startX: x, startY: y, width: 0, height: 0 };
    canvas.addEventListener("mousemove", handleCanvasMouseMove);
    document.addEventListener("mouseup", handleCanvasMouseUp);
  };

  const handleCanvasMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectionRect.current.width = x - selectionRect.current.startX;
    selectionRect.current.height = y - selectionRect.current.startY;

    drawSelectionRect();
  };

  const handleCanvasMouseUp = () => {
    canvasRef.current.removeEventListener("mousemove", handleCanvasMouseMove);
    document.removeEventListener("mouseup", handleCanvasMouseUp);
  };

  const drawSelectionRect = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = selectedImage;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      selectionRect.current.startX,
      selectionRect.current.startY,
      selectionRect.current.width,
      selectionRect.current.height
    );
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = selectedImage;

    const scaleX = image.width / canvas.width;
    const scaleY = image.height / canvas.height;

    const croppedX = selectionRect.current.startX * scaleX;
    const croppedY = selectionRect.current.startY * scaleY;
    const croppedWidth = selectionRect.current.width * scaleX;
    const croppedHeight = selectionRect.current.height * scaleY;

    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;
    const croppedCtx = croppedCanvas.getContext("2d");

    croppedCtx.drawImage(
      image,
      croppedX,
      croppedY,
      croppedWidth,
      croppedHeight,
      0,
      0,
      croppedWidth,
      croppedHeight
    );

    setCroppedImage(croppedCanvas.toDataURL());
  };

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } catch (error) {
      console.log(error);
    }
  }, [selectedImage]);

  const handleDownload = () => {
    if (croppedImage) {
      const downloadLink = document.createElement("a");
      downloadLink.href = croppedImage;
      downloadLink.download = "cropped_image.png";
      downloadLink.click();
    }
  };

  return (
    <div className="row container-fluid p-3 w-100 bg-light">
      <div className="col-lg-6 col-sm-12">
        <div
          style={{
            position: "relative",
            height: "500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <h5>please choose image</h5>
            <input type="file" onChange={handleImageChange} />
            <p className="mt-2">
              please draw cropped area on the below image and then crop
            </p>

            <div style={{ position: "relative" }}>
              {selectedImage && (
                <>
                  <img
                    src={selectedImage}
                    alt=""
                    style={{
                      width: 450,
                      height: 400,
                      position: "absolute",
                      top: "0",
                      left: "0",
                    }}
                  />
                  <canvas
                    style={{ position: "absolute", top: "0", left: "0" }}
                    ref={canvasRef}
                    width={450}
                    height={400}
                    onMouseDown={handleCanvasMouseDown}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-sm-12  mt-5">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h4>Your Cropped Image</h4>
          {croppedImage && (
            <img
              src={croppedImage}
              alt="Cropped"
              style={{ width: "auto", height: "400px" }}
            />
          )}
          <button onClick={handleCrop} className="btn btn-primary">
            Crop
          </button>
          {croppedImage && (
            <button className="btn btn-primary" onClick={handleDownload}>
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
