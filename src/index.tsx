import React from "react";
import ReactDOM from "react-dom";
import { ExtensionDeclaration, FieldExtensionFeature, FieldExtensionType, Wrapper } from "@graphcms/uix-react-sdk";

import { Character } from "@components/Character";

import "./index.html";
import "./style.css";

import "../assets/favicon.png";
import { LoadAssets } from "@components/LoadAssets";

const declaration: ExtensionDeclaration = {
    extensionType : "field",
    fieldType     : FieldExtensionType.FLOAT,
    name          : "Vignette",
    features      : [FieldExtensionFeature.FieldRenderer, FieldExtensionFeature.TableRenderer],
};

ReactDOM.render((
    <Wrapper declaration={ declaration }>
        <LoadAssets />
        <Character  />
    </Wrapper>
), document.querySelector("#app"));
