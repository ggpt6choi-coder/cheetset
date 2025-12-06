'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Download, X, Eraser, MousePointer2, Move, Circle, Square } from 'lucide-react';

interface ImageBlurClientProps {
    labels: {
        title: string;
        description: string;
        drop_zone: string;
        blur_intensity: string;
        mosaic_size: string;
        mode: string;
        mode_blur: string;
        mode_mosaic: string;
        clear_selection: string;
        apply: string;
        download: string;
        reset: string;
    };
}

interface Shape {
    id: string;
    type: 'rect' | 'circle';
    x: number;
    y: number;
    width: number;
    height: number;
    mode: 'blur' | 'mosaic';
    intensity: number;
}

export default function ImageBlurClient({ labels }: ImageBlurClientProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [mode, setMode] = useState<'blur' | 'mosaic'>('mosaic');
    const [shapeType, setShapeType] = useState<'rect' | 'circle'>('rect');
    const [intensity, setIntensity] = useState(10);
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [activeShape, setActiveShape] = useState<Shape | null>(null);
    const [dragAction, setDragAction] = useState<'create' | 'move' | 'resize' | null>(null);
    const [resizeHandle, setResizeHandle] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            loadImage(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (e.dataTransfer.files[0].type.startsWith('image/')) {
                loadImage(e.dataTransfer.files[0]);
            }
        }
    };

    const loadImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const img = new Image();
                img.onload = () => {
                    imageRef.current = img;
                    setImageSrc(e.target!.result as string);
                    setShapes([]);
                    setSelectedShapeId(null);
                };
                img.src = e.target!.result as string;
            }
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (imageSrc && canvasRef.current && imageRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = imageRef.current;

            if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw original image
                ctx.drawImage(img, 0, 0);

                // Apply all shapes
                shapes.forEach(shape => {
                    applyShapeEffect(ctx, shape);
                });

                // Draw active shape being created
                if (activeShape && dragAction === 'create') {
                    drawSelectionOverlay(ctx, activeShape, true);
                }

                // Draw selection overlay for selected shape
                if (selectedShapeId) {
                    const selectedShape = shapes.find(s => s.id === selectedShapeId);
                    if (selectedShape) {
                        drawSelectionOverlay(ctx, selectedShape, true);
                    }
                }
            }
        }
    }, [imageSrc, shapes, activeShape, selectedShapeId, dragAction]);

    const applyShapeEffect = (ctx: CanvasRenderingContext2D, shape: Shape) => {
        // Create a temporary canvas for the effect
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = ctx.canvas.width;
        tempCanvas.height = ctx.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        // Draw the current canvas state to temp canvas
        tempCtx.drawImage(ctx.canvas, 0, 0);

        // Apply effect to the specific area
        const { x, y, width, height, mode, intensity, type } = shape;

        // Ensure integers
        const ix = Math.floor(x);
        const iy = Math.floor(y);
        const iwidth = Math.floor(width);
        const iheight = Math.floor(height);

        if (iwidth <= 0 || iheight <= 0) return;

        // Get image data for the bounding box
        const imageData = ctx.getImageData(ix, iy, iwidth, iheight);
        const { data, width: w, height: h } = imageData;

        if (mode === 'mosaic') {
            const size = Math.max(2, intensity);
            for (let py = 0; py < h; py += size) {
                for (let px = 0; px < w; px += size) {
                    const pixelIndex = (py * w + px) * 4;
                    const r = data[pixelIndex];
                    const g = data[pixelIndex + 1];
                    const b = data[pixelIndex + 2];

                    for (let dy = 0; dy < size && py + dy < h; dy++) {
                        for (let dx = 0; dx < size && px + dx < w; dx++) {
                            const targetIndex = ((py + dy) * w + (px + dx)) * 4;
                            data[targetIndex] = r;
                            data[targetIndex + 1] = g;
                            data[targetIndex + 2] = b;
                        }
                    }
                }
            }
        } else {
            // Simple box blur
            const radius = Math.max(1, Math.floor(intensity / 2));
            const copy = new Uint8ClampedArray(data);

            for (let py = 0; py < h; py++) {
                for (let px = 0; px < w; px++) {
                    let r = 0, g = 0, b = 0, count = 0;

                    for (let ky = -radius; ky <= radius; ky++) {
                        for (let kx = -radius; kx <= radius; kx++) {
                            const ny = Math.min(h - 1, Math.max(0, py + ky));
                            const nx = Math.min(w - 1, Math.max(0, px + kx));
                            const idx = (ny * w + nx) * 4;

                            r += copy[idx];
                            g += copy[idx + 1];
                            b += copy[idx + 2];
                            count++;
                        }
                    }

                    const targetIndex = (py * w + px) * 4;
                    data[targetIndex] = r / count;
                    data[targetIndex + 1] = g / count;
                    data[targetIndex + 2] = b / count;
                }
            }
        }

        // Put the processed image data back to temp canvas
        tempCtx.putImageData(imageData, ix, iy);

        // Now clip and draw back to main canvas
        ctx.save();
        ctx.beginPath();
        if (type === 'circle') {
            ctx.ellipse(x + width / 2, y + height / 2, Math.abs(width / 2), Math.abs(height / 2), 0, 0, 2 * Math.PI);
        } else {
            ctx.rect(x, y, width, height);
        }
        ctx.clip();
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.restore();
    };

    const drawSelectionOverlay = (ctx: CanvasRenderingContext2D, shape: Shape, isSelected: boolean) => {
        const { x, y, width, height, type } = shape;

        ctx.save();
        ctx.strokeStyle = isSelected ? '#4F46E5' : 'rgba(79, 70, 229, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        if (type === 'circle') {
            ctx.ellipse(x + width / 2, y + height / 2, Math.abs(width / 2), Math.abs(height / 2), 0, 0, 2 * Math.PI);
        } else {
            ctx.rect(x, y, width, height);
        }
        ctx.stroke();

        // Draw resize handles if selected
        if (isSelected) {
            ctx.fillStyle = '#4F46E5';
            ctx.setLineDash([]);
            const handleSize = 8;

            // Corners
            const handles = [
                { x, y }, // Top-left
                { x: x + width, y }, // Top-right
                { x, y: y + height }, // Bottom-left
                { x: x + width, y: y + height } // Bottom-right
            ];

            handles.forEach(h => {
                ctx.fillRect(h.x - handleSize / 2, h.y - handleSize / 2, handleSize, handleSize);
            });
        }
        ctx.restore();
    };

    const getMousePos = (e: React.MouseEvent) => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    const isPointInShape = (x: number, y: number, shape: Shape) => {
        if (shape.type === 'rect') {
            return x >= shape.x && x <= shape.x + shape.width &&
                y >= shape.y && y <= shape.y + shape.height;
        } else {
            const centerX = shape.x + shape.width / 2;
            const centerY = shape.y + shape.height / 2;
            const radiusX = Math.abs(shape.width / 2);
            const radiusY = Math.abs(shape.height / 2);
            const normalizedX = (x - centerX) / radiusX;
            const normalizedY = (y - centerY) / radiusY;
            return (normalizedX * normalizedX + normalizedY * normalizedY) <= 1;
        }
    };

    const getResizeHandle = (x: number, y: number, shape: Shape) => {
        const handleSize = 10; // Slightly larger for hit testing
        const handles = {
            'tl': { x: shape.x, y: shape.y },
            'tr': { x: shape.x + shape.width, y: shape.y },
            'bl': { x: shape.x, y: shape.y + shape.height },
            'br': { x: shape.x + shape.width, y: shape.y + shape.height }
        };

        for (const [key, handle] of Object.entries(handles)) {
            if (Math.abs(x - handle.x) <= handleSize && Math.abs(y - handle.y) <= handleSize) {
                return key;
            }
        }
        return null;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const pos = getMousePos(e);
        setDragStart(pos);
        setIsDragging(true);

        // Check if clicking on a resize handle of selected shape
        if (selectedShapeId) {
            const selectedShape = shapes.find(s => s.id === selectedShapeId);
            if (selectedShape) {
                const handle = getResizeHandle(pos.x, pos.y, selectedShape);
                if (handle) {
                    setDragAction('resize');
                    setResizeHandle(handle);
                    return;
                }
            }
        }

        // Check if clicking inside an existing shape
        // Iterate in reverse to select top-most shape
        for (let i = shapes.length - 1; i >= 0; i--) {
            if (isPointInShape(pos.x, pos.y, shapes[i])) {
                setSelectedShapeId(shapes[i].id);
                setDragAction('move');
                // Update intensity/mode controls to match selected shape
                setIntensity(shapes[i].intensity);
                setMode(shapes[i].mode);
                return;
            }
        }

        // If clicking empty space, deselect and start creating new shape
        setSelectedShapeId(null);
        setDragAction('create');
        setActiveShape({
            id: Date.now().toString(),
            type: shapeType,
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            mode,
            intensity
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const pos = getMousePos(e);

        if (dragAction === 'create' && activeShape) {
            setActiveShape({
                ...activeShape,
                width: pos.x - dragStart.x,
                height: pos.y - dragStart.y
            });
        } else if (dragAction === 'move' && selectedShapeId) {
            const dx = pos.x - dragStart.x;
            const dy = pos.y - dragStart.y;

            setShapes(shapes.map(s => {
                if (s.id === selectedShapeId) {
                    return {
                        ...s,
                        x: s.x + dx,
                        y: s.y + dy
                    };
                }
                return s;
            }));
            setDragStart(pos);
        } else if (dragAction === 'resize' && selectedShapeId && resizeHandle) {
            setShapes(shapes.map(s => {
                if (s.id === selectedShapeId) {
                    const newShape = { ...s };
                    if (resizeHandle.includes('l')) {
                        newShape.width += newShape.x - pos.x;
                        newShape.x = pos.x;
                    }
                    if (resizeHandle.includes('r')) {
                        newShape.width = pos.x - newShape.x;
                    }
                    if (resizeHandle.includes('t')) {
                        newShape.height += newShape.y - pos.y;
                        newShape.y = pos.y;
                    }
                    if (resizeHandle.includes('b')) {
                        newShape.height = pos.y - newShape.y;
                    }
                    return newShape;
                }
                return s;
            }));
        }
    };

    const handleMouseUp = () => {
        if (dragAction === 'create' && activeShape) {
            // Only add if size is significant
            if (Math.abs(activeShape.width) > 5 && Math.abs(activeShape.height) > 5) {
                // Normalize negative width/height
                const newShape = { ...activeShape };
                if (newShape.width < 0) {
                    newShape.x += newShape.width;
                    newShape.width = Math.abs(newShape.width);
                }
                if (newShape.height < 0) {
                    newShape.y += newShape.height;
                    newShape.height = Math.abs(newShape.height);
                }

                setShapes([...shapes, newShape]);
                setSelectedShapeId(newShape.id);
            }
        }

        setIsDragging(false);
        setDragAction(null);
        setActiveShape(null);
        setResizeHandle(null);
    };

    const updateSelectedShape = (updates: Partial<Shape>) => {
        if (selectedShapeId) {
            setShapes(shapes.map(s => s.id === selectedShapeId ? { ...s, ...updates } : s));
        }
    };

    const deleteSelectedShape = () => {
        if (selectedShapeId) {
            setShapes(shapes.filter(s => s.id !== selectedShapeId));
            setSelectedShapeId(null);
        }
    };

    const handleDownload = () => {
        if (canvasRef.current) {
            // Re-render without selection overlays
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = imageRef.current;

            if (ctx && img) {
                ctx.drawImage(img, 0, 0);
                shapes.forEach(shape => applyShapeEffect(ctx, shape));

                const link = document.createElement('a');
                link.download = 'blurred-image.png';
                link.href = canvas.toDataURL('image/png');
                link.click();

                // Restore overlays by triggering re-render
                // (React state update will handle this naturally)
            }
        }
    };

    const handleReset = () => {
        setShapes([]);
        setSelectedShapeId(null);
    };

    const handleClear = () => {
        setImageSrc(null);
        setShapes([]);
        setSelectedShapeId(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                        <Eraser className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {labels.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {labels.description}
                </p>
            </div>

            {!imageSrc ? (
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="max-w-2xl mx-auto border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer bg-white dark:bg-gray-800"
                >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                        {labels.drop_zone}
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Editor Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl min-h-[400px] flex items-center justify-center cursor-crosshair">
                            <canvas
                                ref={canvasRef}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                className="max-w-full max-h-[600px] object-contain"
                            />
                            <button
                                onClick={handleClear}
                                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                            <MousePointer2 className="w-4 h-4 inline-block mr-1" />
                            Click and drag to select area. Click existing area to edit.
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-fit">
                        {/* Shape Selection */}
                        <div className="flex space-x-2 mb-6">
                            <button
                                onClick={() => setShapeType('rect')}
                                className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg transition-all ${shapeType === 'rect'
                                        ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                    }`}
                            >
                                <Square className="w-4 h-4" />
                                Rectangle
                            </button>
                            <button
                                onClick={() => setShapeType('circle')}
                                className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg transition-all ${shapeType === 'circle'
                                        ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                    }`}
                            >
                                <Circle className="w-4 h-4" />
                                Circle
                            </button>
                        </div>

                        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-6">
                            <button
                                onClick={() => {
                                    setMode('mosaic');
                                    updateSelectedShape({ mode: 'mosaic' });
                                }}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === 'mosaic'
                                        ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                {labels.mode_mosaic}
                            </button>
                            <button
                                onClick={() => {
                                    setMode('blur');
                                    updateSelectedShape({ mode: 'blur' });
                                }}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === 'blur'
                                        ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                {labels.mode_blur}
                            </button>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {mode === 'mosaic' ? labels.mosaic_size : labels.blur_intensity}
                                </label>
                                <span className="text-sm text-gray-500">{intensity}</span>
                            </div>
                            <input
                                type="range"
                                min="2"
                                max="50"
                                value={intensity}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setIntensity(val);
                                    updateSelectedShape({ intensity: val });
                                }}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                        </div>

                        <div className="space-y-3 mt-auto">
                            {selectedShapeId && (
                                <button
                                    onClick={deleteSelectedShape}
                                    className="w-full px-6 py-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                >
                                    Delete Selected
                                </button>
                            )}
                            <button
                                onClick={handleReset}
                                disabled={shapes.length === 0}
                                className="w-full px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {labels.reset}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
                            >
                                <Download className="w-5 h-5" />
                                {labels.download}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
