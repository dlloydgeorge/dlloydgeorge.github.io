import * as THREE from '/src/libs/three/three.module.js';

import {
    BaseGroup
} from "/src/geometry/bases.js";

import {
    Sphere
} from "/src/geometry/basic_shapes.js";

import {
    CartesianAxes, StatePointer
} from "/src/geometry/composite_shapes.js";

import {
    BlochSphereState
} from "/src/quantum/bloch_sphere_state.js";


class BlochSphere extends BaseGroup {
    constructor(radius, properties) {
        if (!properties) properties = {};

        if (!properties.theta) properties.theta = "0.0000";
        if (!properties.phi) properties.phi = "90.0000";

        if (!properties.color) properties.color = new THREE.Color(0xFFFFFF);
        if (!properties.opacity) properties.opacity = 0.7;

        if (!properties.axesLength) properties.axesLength = radius + (radius * 0.1);
        if (!properties.axesWidth) properties.axesWidth = 1;

        super(properties);

        // Create Sphere
        this.sphere = new Sphere(radius, {
            color: properties.color,
            opacity: properties.opacity,
            skeleton: true,
            skeletonColor: new THREE.Color(0x808080)
        });

        // Add Sphere to BaseGroup
        this.add(this.sphere);

        // Create CartesianAxes
        this.cartesianAxes = new CartesianAxes(properties.axesLength, properties.axesWidth);

        // Add CartesianAxes to BaseGroup
        this.add(this.cartesianAxes);

        // Create StatePointer
        this.statePointer = new StatePointer(radius, 3, {
            color: new THREE.Color(0x9617eb),
            position: new THREE.Vector3(0, radius / 2, 0)
        });

        // Add StatePointer to BaseGroup
        this.add(this.statePointer);

        // Create BlochSphereState
        this.blochSphereState = new BlochSphereState(this.statePointer.theta(), this.statePointer.phi());

        // Set StatePointer
        this.updateBlochSphereState(CartesianAxes.YAxis, THREE.Math.degToRad(properties.theta));
        this.updateBlochSphereState(CartesianAxes.ZAxis, THREE.Math.degToRad(properties.phi));
    }

    updateBlochSphereState(axis, angle) {
        //this.statePointer.rotate(axis, new THREE.Vector3(), angle);
        this.statePointer.rotate(axis, new THREE.Vector3(0,0,0), angle);

        // Update BlochSphereState
        this.blochSphereState.update(this.statePointer.theta(), this.statePointer.phi());
    }

    // allows for amplitude changes in the bloch vector
    updateBlochSphereStateCR() {
        

    }
}

export {
    BlochSphere
};
