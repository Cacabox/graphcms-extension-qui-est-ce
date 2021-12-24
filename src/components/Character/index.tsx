import React, { useEffect, useRef, useState } from "react";
import { useUiExtension } from "@graphcms/uix-react-sdk";
import Draggable, { ControlPosition, DraggableBounds, DraggableData, DraggableEvent } from "react-draggable";

import { Textfit } from "@components/Textfit";

import "./style.css";

interface GrapCMSState {
    values: {
        fileName : string,
        url      : string,
        height   : number,
        width    : number,
    }
}

export const Character = () => {
    // @ts-expect-error
    const { form: { getState }, value, onChange } = useUiExtension();

    const [bounds, setBounds]                   = useState<DraggableBounds>();
    const [defaultPosition, setDefaultPosition] = useState<ControlPosition>();

    const [image, setImage]   = useState<GrapCMSState["values"]>();
    const [width, setWidth]   = useState<number>();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async() => {
            const state: GrapCMSState = await getState();

            setImage(state.values);
        })();
    }, []);

    useEffect(() => {
        if (ref.current !== null && image) {
            const { height: boxHeight, width: boxWidth } = ref.current.getBoundingClientRect();

            const width = image.width / (image.height / boxHeight);
            const left  = -width;
            const right = boxWidth;

            setWidth(width);
            setBounds({ left, right });

            setDefaultPosition({
                x: value ? left + ((right - left) * value) : (boxWidth / 2) - (width / 2),
                y: 0,
            });
        }
    }, [ref.current, image]);

    const handleStop = (event: DraggableEvent, data: DraggableData) => {
        if (bounds) {
            const { left, right } = bounds;

            if (left && right) {
                const diff = (data.x - left) / (right - left);

                onChange(diff);
            }
        }
    }

    const style: React.CSSProperties = {}

    if (image) {
        style.backgroundImage = `url(${ image.url })`;
    }

    if (width) {
        style.width = `${ width }px`;
    }

    return (
        <div className="character">
            <div className="character--box">
                <div className="character--box__background">
                    <img src="assets/case-background.webp" />
                </div>

                <div className="character--box__image-original" ref={ ref } />

                { image && bounds && defaultPosition &&
                    <Draggable axis="x" bounds={ bounds } onStop={ handleStop } defaultPosition={ defaultPosition }>
                        <div className="character--box__image" style={ style } />
                    </Draggable>
                }

                <div className="character--box__front">
                    <img src="assets/case-front.webp" />
                </div>

                { image && <Textfit className="character--box__name" text={ image.fileName } font="Sweaty Belvin" /> }
            </div>
        </div>
    );
}
