/**
 * Copyright (c) 2015-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViroCamera
 * @flow
 */
'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var createReactClass = require('create-react-class');
var ViroCamera = createReactClass({
    propTypes: __assign(__assign({}, react_native_1.View.propTypes), { position: prop_types_1.default.arrayOf(prop_types_1.default.number), rotation: prop_types_1.default.arrayOf(prop_types_1.default.number), active: prop_types_1.default.bool.isRequired, animation: prop_types_1.default.shape({
            name: prop_types_1.default.string,
            delay: prop_types_1.default.number,
            loop: prop_types_1.default.bool,
            onStart: prop_types_1.default.func,
            onFinish: prop_types_1.default.func,
            run: prop_types_1.default.bool,
            interruptible: prop_types_1.default.bool,
        }), fieldOfView: prop_types_1.default.number }),
    componentDidMount: function () {
        this.context.cameraDidMount(this);
    },
    componentWillUnmount: function () {
        this.context.cameraWillUnmount(this);
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (prevProps.active != this.props.active) {
            this.context.cameraDidUpdate(this, this.props.active);
        }
    },
    setNativeProps: function (nativeProps) {
        this._component.setNativeProps(nativeProps);
    },
    _onAnimationStart: function (event /*: Event*/) {
        this.props.animation && this.props.animation.onStart && this.props.animation.onStart();
    },
    _onAnimationFinish: function (event /*: Event*/) {
        this.props.animation && this.props.animation.onFinish && this.props.animation.onFinish();
    },
    render: function () {
        // Uncomment this to check props
        //checkMisnamedProps("ViroCamera", this.props);
        var _this = this;
        return (<VRTCamera ref={function (component) { _this._component = component; }} {...this.props} onAnimationStartViro={this._onAnimationStart} onAnimationFinishViro={this._onAnimationFinish}/>);
    },
});
ViroCamera.contextTypes = {
    cameraDidMount: prop_types_1.default.func,
    cameraWillUnmount: prop_types_1.default.func,
    cameraDidUpdate: prop_types_1.default.func,
};
var VRTCamera = react_native_1.requireNativeComponent('VRTCamera', ViroCamera, {
    nativeOnly: {
        scale: [1, 1, 1],
        materials: [],
        visible: true,
        canHover: true,
        canClick: true,
        canTouch: true,
        canScroll: true,
        canSwipe: true,
        canDrag: true,
        canPinch: true,
        canRotate: true,
        onPinchViro: true,
        onRotateViro: true,
        onHoverViro: true,
        onClickViro: true,
        onTouchViro: true,
        onScrollViro: true,
        onSwipeViro: true,
        onDragViro: true,
        transformBehaviors: true,
        canFuse: true,
        onFuseViro: true,
        timeToFuse: true,
        viroTag: true,
        scalePivot: true,
        rotationPivot: true,
        canCollide: true,
        onCollisionViro: true,
        onNativeTransformDelegateViro: true,
        hasTransformDelegate: true,
        physicsBody: true,
        dragType: true,
        onAnimationStartViro: true,
        onAnimationFinishViro: true,
        ignoreEventHandling: true,
        dragPlane: true,
        renderingOrder: true,
    }
});
module.exports = ViroCamera;
