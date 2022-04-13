import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class MyClass extends Component {
    constructor() {

        super()
        this.state = {
            myclass: [],
            token: "",
            userName: "",
            id_user: 0,
            id_category: 0,
            id_class: 0,
            name_class: "",
            image_class: "",
            description_class: "",
            name: "",
            category_id: "",
            search: ""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.userName = localStorage.getItem('name')
            this.state.id_user = localStorage.getItem('id')
        } else {
            window.location = '/signin'
        }

    }

    getCategory = () => {
        let url = "http://localhost:8000/transaksi/myclass/" + this.state.id_user
        axios.get(url)
            .then(res => {
                this.setState({
                    myclass: res.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    findMyClass = (event) => {
        // `http://localhost:8000/class/${this.state.id_category}`
        let url = `http://localhost:8000/transaksi/find/${this.state.id_user}` ;
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai
            // berdasarkan keyword
            axios.post(url, form)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.setState({ myclass: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.getCategory()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className='fs-5 fw-bolder mt text-left mb-2' id="text-blue">Hi, {this.state.userName}</h1>

                    <h1 className="display-6 fw-bold text-left">Here're your classes</h1>

                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Your Class..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findMyClass} />
                        </div>
                        {/* <div className="col-3 mt-5">
                    <button onClick={() => this.handleAdd()} className="btn btn-dark" id="btn-blue">Add Data</button>
                </div> */}
                    </div>

                    <div className="row">
                        {this.state.myclass.map((item, index) => (
                            <div className="col-lg-6 col-sm-12 p-2" key={this.props.key}>
                                <div className="card" id="card-class">
                                    <div className="card-body row" id="crd">
                                        {/* menampilkan Gambar / cover */}
                                        <div className="col-5 mt-3">
                                            <img src={"http://localhost:8000/image/class/" + item.image_class} className="img"
                                                id="buku" />
                                        </div>

                                        {/* menampilkan deskripsi */}
                                        <div className="col-7 mt-3" id="text">
                                            <h4 className="judul fs-3">
                                                {item.name_class}
                                            </h4>
                                            <h6 className="price fs-6 fw-normal">
                                                {item.name} Category
                                            </h6>
                                            <h6 className="fs-6 fw-lighter mb-3">
                                                {item.description_class}
                                            </h6>
                                            <NavLink to={`/detail/${item.id_class}`} className="btn btn-sm btn-dark m-1" id="blue">
                                                Detail
                                            </NavLink>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
