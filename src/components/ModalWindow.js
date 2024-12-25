/***************************************************************************
 *                           MODAL COMPONENT
 * Reusable modal window that can show different content, menu bars, and 
 * status bars. Supports dragging, resizing, and custom styling.
 ***************************************************************************/

import React, { useState, useEffect, useRef } from "react";

const ModalWindow = ({
    title,
    content,
    isOpen,
    isVisible,
    onClose,
    onMinimize,
    onMaximizeToggle,
    onMouseDown,
    customStyles = {},
    zIndex,
    isMobile,
    showMenuBar = true,
    showStatusBar = true,
    customMenuBar,
    customStatusBar,
    customTitleBar,
}) => {
    const [modalWidth, setModalWidth] = useState(isMobile ? 300 : 450); // Smaller width for mobile
    const [modalHeight, setModalHeight] = useState(isMobile ? 300 : 450); // Smaller height for mobile
    const [isMaximized, setIsMaximized] = useState(false);
    const modalRef = useRef(null);


    useEffect(() => {
        console.log("Modal Width:", modalWidth);
    }, [modalWidth]);
    
    // Handle Escape key to close modal
    useEffect(() => {
        if (!isOpen) return;
    
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);
    
    // Reset modal state when it is closed
    useEffect(() => {
        if (!isVisible) {
            console.log("Modal state reset");
    
            // Set width and height based on whether it's mobile
            setModalWidth(isMobile ? 300 : 450); // Adjusted for smaller size on mobile
            setModalHeight(isMobile ? 300 : 450); // Adjusted for smaller size on mobile
            setIsMaximized(false); // Reset maximization state
    
            // Reset position to center
            if (modalRef.current) {
                if (isMobile) {
                    // Center the modal with fixed offsets for mobile
                
                    modalRef.current.style.top = `calc(50vh - 150px)`; // Center vertically (150px = 300/2)
                    modalRef.current.style.left = `calc(50vw - 150px)`; // Center horizontally (150px = 300/2)
                } else {
                    // Center the modal for desktop
                    modalRef.current.style.top = `calc(50vh - 225px)`; // Center vertically (225px = 450/2)
                    modalRef.current.style.left = `calc(50vw - 225px)`; // Center horizontally (225px = 450/2)
                }
            }
        }
    }, [isVisible, isMobile]);
    


    // Handle resizing (supports both mouse and touch events)
    const startResizing = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isMaximized) return; // Prevent resizing when maximized

        // Determine if the event is a touch event
        const isTouchEvent = e.type === "touchstart";

        // Extract initial coordinates based on event type
        const startX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        const startY = isTouchEvent ? e.touches[0].clientY : e.clientY;
        const startW = modalWidth;
        const startH = modalHeight;

        // Define the resize handler
        const doResize = (moveEvent) => {
            // Prevent default behavior for touch events
            if (isTouchEvent) {
                moveEvent.preventDefault();
            }

            // Extract movement coordinates
            const moveX = isTouchEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
            const moveY = isTouchEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

            // Calculate new dimensions
            const newWidth = Math.max(
                300,
                Math.min(window.innerWidth - 40, startW + (moveX - startX))
            ); // Minimum width of 300px, maximum with 40px padding
            const newHeight = Math.max(
                200,
                Math.min(window.innerHeight - 40, startH + (moveY - startY))
            ); // Minimum height of 200px, maximum with 40px padding

            // Update modal dimensions
            setModalWidth(newWidth);
            setModalHeight(newHeight);
        };

        // Define the stop resizing handler
        const stopResizing = () => {
            if (isTouchEvent) {
                window.removeEventListener("touchmove", doResize);
                window.removeEventListener("touchend", stopResizing);
            } else {
                window.removeEventListener("mousemove", doResize);
                window.removeEventListener("mouseup", stopResizing);
            }
        };

        // Attach the appropriate event listeners based on event type
        if (isTouchEvent) {
            window.addEventListener("touchmove", doResize, { passive: false });
            window.addEventListener("touchend", stopResizing);
        } else {
            window.addEventListener("mousemove", doResize);
            window.addEventListener("mouseup", stopResizing);
        }
    };

    // Handle dragging by title bar (supports both mouse and touch events)
    const handleMouseDown = (e) => {
        const modal = modalRef.current;

        if (typeof onMouseDown === "function") {
            onMouseDown();
        }

        // Determine if the event is a touch event
        const isTouchEvent = e.type === "touchstart";

        // Extract initial coordinates based on event type
        const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

        const offsetX = clientX - modal.getBoundingClientRect().left;
        const offsetY = clientY - modal.getBoundingClientRect().top;

        // Define the move handler
        const handleMove = (moveEvent) => {
            // Prevent default behavior for touch events
            if (isTouchEvent) {
                moveEvent.preventDefault();
            }

            // Extract movement coordinates
            const moveX = isTouchEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
            const moveY = isTouchEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

            // Update modal position
            modal.style.left = `${moveX - offsetX}px`;
            modal.style.top = `${moveY - offsetY}px`;
        };

        // Define the stop dragging handler
        const stopDragging = () => {
            if (isTouchEvent) {
                document.removeEventListener("touchmove", handleMove);
                document.removeEventListener("touchend", stopDragging);
            } else {
                document.removeEventListener("mousemove", handleMove);
                document.removeEventListener("mouseup", stopDragging);
            }
        };

        // Attach the appropriate event listeners based on event type
        if (e.target.closest(".modal-titlebar")) {
            if (isTouchEvent) {
                document.addEventListener("touchmove", handleMove, { passive: false });
                document.addEventListener("touchend", stopDragging);
            } else {
                document.addEventListener("mousemove", handleMove);
                document.addEventListener("mouseup", stopDragging);
            }
        }
    };

    const mainAreaStyles = {
        flex: 1,
        overflow: "auto",
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        ...customStyles.main,
    };

    const handleMaximizeToggle = () => {
        const toggledMaximized = !isMaximized;
        setIsMaximized(toggledMaximized);

        if (onMaximizeToggle) {
            onMaximizeToggle(toggledMaximized);
        }

        if (toggledMaximized) {
            setModalWidth(window.innerWidth - 20); // Max width with padding
            setModalHeight(window.innerHeight - 20); // Max height with padding
            if (modalRef.current) {
                modalRef.current.style.top = "10px";
                modalRef.current.style.left = "10px";
            }
        } else {
            setModalWidth(isMobile ? 300 : 450); // Reset to default width based on device
            setModalHeight(isMobile ? 300 : 450); // Reset to default height based on device
            if (modalRef.current) {
                modalRef.current.style.top = isMobile
                    ? "calc(50vh - 150px)" // Center vertically for mobile
                    : "calc(50vh - 225px)"; // Center vertically for desktop
                modalRef.current.style.left = isMobile
                    ? "calc(50vw - 150px)" // Center horizontally for mobile
                    : "calc(50vw - 225px)"; // Center horizontally for desktop
            }
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={modalRef}
            style={{
                position: "absolute",
                
                top: isMaximized ? "10px" : "calc(50vh - 225px)", // 450px height / 2
                left: isMaximized ? "10px" : "calc(50vw - 225px)", // 450px width / 2
                width: `${modalWidth}px`,
                height: `${isMaximized ? `calc(100vh - 20px)` : `${modalHeight}px`}`,
                backgroundColor: "#fff",
                border: "2px solid black",
                display: isVisible ? "flex" : "none",
                flexDirection: "column",
                zIndex: zIndex,
                overflow:"hidden",
                ...customStyles.container,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown} // Added touch event handler for dragging
        >

            <div
                className="modal-titlebar"
                style={{
                    backgroundColor: "#000080",
                    color: "white",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 10px",
                    fontSize: "14px",
                    userSelect: "none",
                    cursor: "move",
                    ...customStyles.titleBar,
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown} // Added touch event handler for dragging
            >
                {customTitleBar ? customTitleBar : <span>{title}</span>}
                <div style={{ display: "flex", gap: "5px" }}>
                    {/* Minimize Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onMinimize) onMinimize(); // Call the minimize handler
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                            lineHeight: "14px",
                            cursor: "pointer",
                        }}
                        title="Minimize"
                    >
                        &#x2212;
                    </button>

                    {/* Maximize Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMaximizeToggle();
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                            lineHeight: "14px",
                            cursor: "pointer",
                        }}
                        title={isMaximized ? "Restore" : "Maximize"}
                    >
                        &#10066;
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                            lineHeight: "14px",
                            cursor: "pointer",
                        }}
                        title="Close"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {showMenuBar && (
                <div
                    style={{
                        backgroundColor: "#c0c0c0",
                        borderBottom: "1px solid #808080",
                        padding: "5px 10px",
                        fontSize: "12px",
                        display: "flex",
                        userSelect: "none",
                        ...customStyles.menuBar,
                    }}
                >
                    {customMenuBar ? customMenuBar : (
                        <>
                            <span style={{ marginRight: "15px", cursor: "pointer" }}>File</span>
                            <span style={{ marginRight: "15px", cursor: "pointer" }}>Edit</span>
                            <span style={{ marginRight: "15px", cursor: "pointer" }}>Search</span>
                            <span style={{ marginRight: "15px", cursor: "pointer" }}>Help</span>
                        </>
                    )}
                </div>
            )}

            <div style={mainAreaStyles}>{content}</div>

            {showStatusBar && (
                <div
                    style={{
                        backgroundColor: "#c0c0c0",
                        borderTop: "1px solid #808080",
                        height: "25px",
                        padding: "0 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: "black",
                        userSelect: "none",
                        ...customStyles.statusBar,
                    }}
                >
                    {customStatusBar ? customStatusBar : (
                        <>
                            <span>Ln 1, Col 1</span>
                            <span>100%</span>
                        </>
                    )}
                </div>
            )}

            {!isMaximized && (
                <div
                    onMouseDown={startResizing}
                    onTouchStart={startResizing} // Added touch event handler for resizing
                    style={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: "#c0c0c0",
                        borderTop: "1px solid #808080",
                        borderLeft: "1px solid #808080",
                        cursor: "nwse-resize",
                        alignSelf: "flex-end",
                        userSelect: "none",
                        ...customStyles.resizer,
                    }}
                ></div>
            )}
        </div>
        )
    };

export default ModalWindow;
