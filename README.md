## Meta-graphs in D3.js ##

#### Authors ####

- [__GAGNAIRE Romain__](mailto:romgagnaire@gmail.com) ([JoeTheFkingFrypan](https://github.com/JoeTheFkingFrypan), [GAGNAIRE-Romain](https://github.com/GAGNAIRE-Romain))
- __AMELOT Nicolas__ ([KoalaMoala](https://github.com/KoalaMoala))

#### Background ####

D3.js is a technology writen in JavaScript capable of transforming raw data into usable information in an almost infinite number of ways. The beauty of D3.js lies within its ability to create all kinds of graphical representation, from the basic pie-chart, to geomaping, there is not any real limit to what you can do with it, only your imagination. 

What makes it particularly attractive (and good-looking) are animations. Static data is plain boring. It is much more interesting when you can actually play with the data, move through it as you see fit, change settings so it better suit your taste. This is one of the biggest pros of D3.js : pretty much everything can be animated (size of the elements, their color, their postition, etc).

As far as we're aware, there aren't many visualisations based on D3 in the theme of meta-graphs. Meta-graphs are like any other graph, except they are multi-layered : each node is a graph, containing at least a single node. The following example illustrates what is a one-layered meta-graph. There are 3 super-nodes (represented as colored squares), each of them containing a certain amount of children nodes. This example is very simple, but the concept can go further than this, as children nodes could have graphs themselves, creating a N-layered graph.

![poc-01](https://cloud.githubusercontent.com/assets/2607260/16344929/314cce70-3a0d-11e6-93b6-00741cc0ec94.png)

While some visualisations does already exist that fit the theme like [Pack Hierarchy](http://mbostock.github.io/d3/talk/20111116/pack-hierarchy.html), [Circle Packing](https://bl.ocks.org/mbostock/raw/4063530/) or [Improved Circle Packing](https://bl.ocks.org/mbostock/raw/467f1a0db47753cc630e/), they could be enhanced by adding new features to better manipulate the data.

#### Aim of this project ####

- Discover, learn and experiment with D3.js, a technology we have never used before.
- Discover, learn and experiment with various technologies like NodeJS, ExpressJS, Jade, Stylus, Grunt, etc.
- Implement brand new features in the theme of meta-graphs.
- Build the largest and most comprehensive tool possible within the time limit of this project.

#### Technology used ####

- [NodeJS](https://nodejs.org/en/) using [ExpressJS](http://expressjs.com/), the web application framework for its Model-View-Controller architecture
- [D3.js v.3.5.17](https://d3js.org/) to display graphs using vector graphics
- [Jade](http://jade-lang.com/), an effective template engine
- [Stylus](http://stylus-lang.com/), an very intuive and simple CSS preprocessor 
- External JavaScript libraries used: [JQuery](https://jquery.com/), [JQueryUI](https://jqueryui.com/), [Bootstrap 3](http://getbootstrap.com/), [FontAwesome](http://fontawesome.io/)

#### Core files ###

The main application logic is divided into 2 different files :

- [Index.jade](https://github.com/JoeTheFkingFrypan/VA-Final-Project/blob/master/views/index.jade)
- [Graph.utils.js](https://github.com/JoeTheFkingFrypan/VA-Final-Project/blob/master/public/javascripts/graph.utils.js)

Available datasets are located in [public/json](https://github.com/JoeTheFkingFrypan/VA-Final-Project/tree/master/public/json)

#### How to run the application ####

1. Download and install [NodeJS](https://nodejs.org/en/)
2. Donwload the [latest snapshot of our application](https://github.com/JoeTheFkingFrypan/VA-Final-Project/archive/master.zip)
3. Extract the source code into the directory of your choosing (for example `E:\Dev\Workspace\VA-Final-Project`)
4. Open a command prompt (`bash/shell` on UNIX or `cmd` on Windows)
5. Navigate to the directory where you've extracted the sources (for example ` cd E:\Dev\Workspace\VA-Final-Project`)
6. From that directory, run the command `npm start`
7. Open your web browser and load the page [localhost:3000](localhost:3000)

![start](https://cloud.githubusercontent.com/assets/2607260/16365521/45880cdc-3bd0-11e6-9100-5a279a06ea7e.gif)

#### Current state of features ####

- [x] Basic graph representation (vectorial nodes & edges)
- [x] Zoom
- [ ] Pan
- [x] Drag
- [x] Basic brush selection
- [x] Getting rid of context-menu (right-click popup) on the visualization view
- [ ] Actually do something with selected nodes :)
- [x] Node & edges highliting for neighbors on mouse-over
- [x] Ability to dynamically change visualisation settings (edge strength, node radius, etc)
- [ ] Ability to change node/edge color
- [x] Ability to load datasets using different formatting (Nodes can be identified by ID, name or index. Same goes for edges)
- [ ] Ability to load external dataset (uploading dataset or copy-pasting into import form)
- [x] Ability to collapse & restore "groups" (super-node + children)
- [ ] Dynamic edge routing due to collapsing & restoring super-nodes in a non-tree layout

#### Screenshots ####

__DISCLAIMER__ Please keep in mind the following __animated pictures__ are GIFS recorded at 33 fps (frames per second) using a quantization image processing. While the resulting quality of the images is descent enough, some of them may contain some __visual artifacts__ which do not represent what the actual render would be 

*For instance, both brush selection and zoom features are working just fine, the image just happen to have trailing pixels.*

For a __genuine and artifact-free experience__, you might want to consider running the project on your computer by following the steps described in the section `How to run the application`

##### __Main UI__ #####

![screen01alt](https://cloud.githubusercontent.com/assets/2607260/16345359/8d79eb5e-3a0f-11e6-847c-1658bc1a987a.png)

##### __Neighbor Highlighting on mouse-over__ #####
 
![highlighting](https://cloud.githubusercontent.com/assets/2607260/16346355/d43fa664-3a14-11e6-8b78-d8fd4d8b7ad6.gif)

##### __Brush selection__ ######

![brush-selection](https://cloud.githubusercontent.com/assets/2607260/16346391/096e237e-3a15-11e6-82d5-4c578c1b1d5b.gif)

##### __Zoom__ ######

![zoom](https://cloud.githubusercontent.com/assets/2607260/16346396/14fdff8e-3a15-11e6-96d7-9b04e3f43ea7.gif)

##### __Drag__ ######

![drag](https://cloud.githubusercontent.com/assets/2607260/16346404/26270c88-3a15-11e6-9102-884badb7cf5a.gif)

##### __Loading datasets__ ######

![load](https://cloud.githubusercontent.com/assets/2607260/16346805/415aa67a-3a17-11e6-9ab3-ee543d9f7492.gif)

##### __Toggle setting menu__ ######
 
![settings](https://cloud.githubusercontent.com/assets/2607260/16346850/7d639d2a-3a17-11e6-8fd2-b8db3293a1aa.gif)

##### __Dynamic updates of simulation settings__ ######
 
![dynamics](https://cloud.githubusercontent.com/assets/2607260/16346947/0c0aa6cc-3a18-11e6-9cbb-95750becc11d.gif)