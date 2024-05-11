import seedrandom from 'seedrandom';
import * as VectorArray from './app/vectorArray.js';
import { PlantFactory } from './plants/plant_factory.js';
import {Layer} from "./app/layer.js"
import {Util} from './app/util.js';
import {Prng} from './app/prng.js';
import {DNA} from './dna.js';
import {nameComponent} from './app/nameComponent.js';
// import * as seedrandom from 'seedrandom/seedrandom.js'
import { GeneEditorComponent } from './app/geneEditorComponent.js';


class Generator {

    CANVAS_WIDTH = 704;
    CANVAS_HEIGHT = 863;

    constructor() {
        this._id = 0;
        // this._configuration = (v) => (new URLSearchParams(window.location.search));
        // this._configuration = (v) => {"plantCount"};
        this._configuration = () => ({
            plantCount: 1,
            seed: 'exampleSeed123',
            plantType: 'flowering'
        });

        // this.geneEditor = new GeneEditorComponent({elementId: 'gene-editor-component'});

        this.OnChange()
    }

    OnChange() {
        this._UpdateFromUI();
        this._ANIMATE();
    }

    _UpdateFromUI() {
        // new Math.seedrandom(); // call with new to create a standalone generator without affecting Math.random() yet.
        Math.seed = function(x) { return seedrandom(x); }
    }

    _ANIMATE() {

        let options = {
            width: this.CANVAS_WIDTH,
            height: this.CANVAS_HEIGHT, 
            xof:this.CANVAS_WIDTH/2,
            yof:this.CANVAS_WIDTH,
            dna: {
                seed: this.configuration.seed,
            },
            filtering_enabled: true
        };

        // if(this.geneEditor.isEmpty) {
        //     // console.log("EDITING", this.geneEditor.dna)
        //     options.dna = new DNA(this.geneEditor.dna);
        //     renderObject.innerHTML = "";
        // }else{
        //     // console.log("NEW")
        //     console.log('OPTION SEED:', options.dna.seed)
        //     options.dna = new DNA(options.dna);
        // }

        const plant = new PlantFactory(options, this.configuration.plantType);
            console.log("Generating", plant)
            // TODO: here is the problem, generate needs to not take this container mebe?
            plant.generate({containerElementId: 'canvas-container'});
                
        // if(plantCount == 1) {
        //     this.geneEditor.render(plant.dna.genes);
        //     var perRow = 9;
        // }else{
        //     var perRow = 4
        // }


        // var perRow = 9;
        // This contains the entire plant image and name
        // const name = new nameComponent({containerElementId: 'render-object'});
        //       name.render(plant, "col-md-" + perRow);


    }




    get configuration() {
        return this._configuration();
    }


}

let _APP = null;

_APP = new Generator();

_APP.OnChange();

