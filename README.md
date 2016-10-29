# Tekkotsu-Composer
Drag-and-drop state machine composer for Tekkotu Robotics Framework developed with Professor David Touretzky of CMU

## About
The Teokkotsu Robotics Framework utilizes state machines written in C++ to manage control flow in the application, a vision system, and an automatically maintained world map. I was tasked with designing and developing a web application to allow composition of state machines without needing to write C++ code, which would give high schoolers an easier platform to learn computer science and robotics.

[![Demo](https://cdn.rawgit.com/sashankg/Tekkotsu-Composer/master/tekdemo.gif)](https://youtu.be/iXVce4uA1uE)

## Dependencies
- React
- Redux to store application state
- JointJS as a layer on top of SVG because it implemented the linking
- React DND, for dragging new elements into the graph
- React Modal for editing elements view
- (Experimental) Redux Sagas to simplify actions

## Graph
One of the biggest challenges was getting Redux and Backbone (which is used by JointJS) to play nicely with each other. In order to do this, I defined variables in the application state for the various states of the graph like panning, dragging, and linking. I then dispatched actions that changed these variables in the Backbone event handlers. On top of this, I also had to implement React DND for creating new element, which added another layer of complexity.

## Transpiler
In order to convert the state machine diagram into the corresponding C++ code, I used the ES6 template literals features. I just iterated over all the elements, pulling data from the application state about types and names, and appended the necessary code as a template literal with the corresponding data filled in. The result is a straightforward and clean solution. 

![Transpiler Demo](https://cdn.rawgit.com/sashankg/Tekkotsu-Composer/master/transpiler.png)
