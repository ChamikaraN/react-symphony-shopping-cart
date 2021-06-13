import React, { Component } from 'react';
import { BOOK_TYPE } from "../constants";

export default class Filter extends Component {
    render() {
        return (
            <div>
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <span class="nav-link">
                            <select class="form-select" value={this.props.category} onChange={this.props.filterBooks}>
                                <option selected value="">All Books</option>
                                <option value={BOOK_TYPE.FICTION}>Fiction</option>
                                <option value={BOOK_TYPE.CHILDREN}>Children</option>
                            </select>
                        </span>
                    </li>
                </ul>
            </div>
        );
    }
}
