import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Reset_Password extends Component {
    constructor() {
        super();
        this.state = {
            view: 1,
        };
    }
}
