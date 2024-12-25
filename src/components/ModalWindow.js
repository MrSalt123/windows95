/***************************************************************************
 *                           MODAL COMPONENT
 * Reusable modal window that can show different content, menu bars, and 
 * status bars. Supports dragging, resizing, stacking with offset, and custom styling.
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
    zIndex = 1000, // Default zIndex
    isMobile,
    showMenuBar = true,
    showStatusBar = true,
    customMenuBar,
    customStatusBar,
    customTitleBar,
    stackIndex = 0, // New prop for stacking
}) => {
    // Initialize modal dimensions based on device type
    const [modalWidth, setModalWidth] = useState(isMobile ? 200 : 500); // Increased width for desktop
    const [modalHeight, setModalHeight] = useState(isMobile ? 200 : 500); // Increased height for desktop
    const [isMaximized, setIsMaximized] = useState(false);
    const modalRef = useRef(null);

    // Define the offset per stack index (in pixels)
    const OFFSET_STEP = 20;

    // Calculate offset based on stackIndex
    const calculateOffset = () => {
        if (isMaximized) return { topOffset: 0, leftOffset: 0 };
        const topOffset = stackIndex * OFFSET_STEP;
        const leftOffset = stackIndex * OFFSET_STEP;

        // Ensure the modal doesn't go off-screen
        const maxTopOffset = window.innerHeight - modalHeight - 40; // 20px padding top and bottom
        const maxLeftOffset = window.innerWidth - modalWidth - 40; // 20px padding left and right

        return {
            topOffset: Math.min(topOffset, maxTopOffset),
            leftOffset: Math.min(leftOffset, maxLeftOffset),
        };
    };

    const { topOffset, leftOffset } = calculateOffset();

    // Log modal width changes (for debugging)
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
            setModalWidth(isMobile ? 200 : 500); // Updated desktop width
            setModalHeight(isMobile ? 200 : 500); // Updated desktop height
            setIsMaximized(false); // Reset maximization state

            // Reset position with offset based on stackIndex
            if (modalRef.current) {
                const { topOffset, leftOffset } = calculateOffset();
                modalRef.current.style.top = isMobile
                    ? `calc(50vh - ${modalHeight / 2}px) + ${topOffset}px`
                    : `calc(50vh - ${modalHeight / 2}px) + ${topOffset}px`;
                modalRef.current.style.left = isMobile
                    ? `calc(50vw - ${modalWidth / 2}px) + ${leftOffset}px`
                    : `calc(50vw - ${modalWidth / 2}px) + ${leftOffset}px`;
            }
        }
    }, [isVisible, isMobile, stackIndex, modalHeight, modalWidth]);

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
            let newWidth = startW + (moveX - startX);
            let newHeight = startH + (moveY - startY);

            // Define minimum and maximum sizes
            const minWidth = 300;
            const minHeight = 200;
            const maxWidth = isMobile ? window.innerWidth - 40 : window.innerWidth; // 20px padding on each side for mobile
            const maxHeight = isMobile ? window.innerHeight - 40 : window.innerHeight; // 20px padding on top and bottom for mobile

            // Clamp the new dimensions within the boundaries
            newWidth = Math.max(minWidth, isMobile ? Math.min(newWidth, maxWidth) : newWidth);
            newHeight = Math.max(minHeight, isMobile ? Math.min(newHeight, maxHeight) : newHeight);

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

            // Calculate new positions
            let newLeft = moveX - offsetX;
            let newTop = moveY - offsetY;

            if (isMobile) {
                // Define boundaries to prevent modal from going off-screen on mobile
                const maxLeft = window.innerWidth - modalWidth - 20; // 20px padding on the right
                const maxTop = window.innerHeight - modalHeight - 20; // 20px padding at the bottom

                // Clamp the positions within the viewport
                newLeft = Math.max(10, Math.min(newLeft, maxLeft)); // 10px padding on the left
                newTop = Math.max(10, Math.min(newTop, maxTop)); // 10px padding at the top
            }

            // Update modal position
            modal.style.left = `${newLeft}px`;
            modal.style.top = `${newTop}px`;
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

    // Styles for the main content area
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

    // Handle maximize/restore functionality
    const handleMaximizeToggle = () => {
        const toggledMaximized = !isMaximized;
        setIsMaximized(toggledMaximized);

        if (onMaximizeToggle) {
            onMaximizeToggle(toggledMaximized);
        }

        if (toggledMaximized) {
            setModalWidth(window.innerWidth - 40); // Max width with 20px padding on each side
            setModalHeight(window.innerHeight - 40); // Max height with 20px padding on top and bottom
            if (modalRef.current) {
                modalRef.current.style.top = "20px";
                modalRef.current.style.left = "20px";
            }
        } else {
            setModalWidth(isMobile ? 200 : 500); // Reset to default width based on device
            setModalHeight(isMobile ? 200 : 500); // Reset to default height based on device
            if (modalRef.current) {
                const { topOffset, leftOffset } = calculateOffset();
                modalRef.current.style.top = isMobile
                    ? `calc(50vh - 100px) + ${topOffset}px` // Center vertically for mobile
                    : `calc(50vh - 250px) + ${topOffset}px`; // Center vertically for desktop
                modalRef.current.style.left = isMobile
                    ? `calc(50vw - 100px) + ${leftOffset}px` // Center horizontally for mobile
                    : `calc(50vw - 250px) + ${leftOffset}px`; // Center horizontally for desktop
            }
        }
    };

    // Render nothing if the modal is not visible
    if (!isVisible) return null;

    return (
        <div
            ref={modalRef}
            style={{
                position: "absolute",
                top: isMaximized
                    ? "20px"
                    : isMobile
                        ? `calc(50vh - 100px) + ${topOffset}px` // Center vertically for mobile with offset
                        : `calc(50vh - 250px) + ${topOffset}px`, // Center vertically for desktop with offset
                left: isMaximized
                    ? "20px"
                    : isMobile
                        ? `calc(50vw - 100px) + ${leftOffset}px` // Center horizontally for mobile with offset
                        : `calc(50vw - 250px) + ${leftOffset}px`, // Center horizontally for desktop with offset
                width: `${modalWidth}px`,
                height: `${isMaximized ? `calc(100vh - 40px)` : `${modalHeight}px`}`, // Adjusted for padding when maximized
                backgroundColor: "#fff",
                border: "2px solid black",
                display: isVisible ? "flex" : "none",
                flexDirection: "column",
                zIndex: zIndex + stackIndex, // Higher zIndex for higher stackIndex
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
                overflow: "hidden",
                ...customStyles.container,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >

            {/* Title Bar */}
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
                onTouchStart={handleMouseDown}
            >
                {/* Custom Title Bar or Default Title */}
                {customTitleBar ? customTitleBar : <span>{title}</span>}
                <div style={{ display: "flex", gap: "5px" }}>
                    {/* Minimize Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onMinimize) onMinimize();
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
                        {isMaximized ? "🗗" : "🗖"}
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

            {/* Menu Bar */}
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

            {/* Main Content Area */}
            <div style={mainAreaStyles}>{content}</div>

            {/* Status Bar */}
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

            {/* Resize Handle */}
            {!isMaximized && (
                <div
                    onMouseDown={startResizing}
                    onTouchStart={startResizing}
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
    );
}
export default ModalWindow;
