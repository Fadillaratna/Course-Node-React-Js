import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            admin: [],
            isModalOpen: false,
            token: "",
            adminName: "",
            adminId: 0,
            id_admin: 0,
            theimage: false,
            iconGender: false,
            name: "",
            image: "",
            address: "",
            level: "",
            gender: "",
            age: 0,
            phone: "",
            email: "",
            password: ""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.adminId = localStorage.getItem('id')
            // this.state.admin = localStorage.getItem('admin')
        } else {
            window.location = '/signin'
        }

        if (this.state.admin.image != null) {
            this.state.theimage = true
        }

        

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAdmin = () => {
        let url = `http://localhost:8000/admin/${this.state.adminId}`;
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
            .then(res => {
                // mengisikan data dari respon API ke array pegawai
                this.setState({
                     admin: res.data.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleEdit = () => {
        this.setState({
            isModalOpen: true,
            id_admin: this.state.admin.id_admin,
            name: this.state.admin.name,
            image: this.state.admin.image,
            address: this.state.admin.address,
            gender: this.state.admin.gender,
            age: this.state.admin.age,
            phone: this.state.admin.phone,
            email: this.state.admin.email,
            password: this.state.admin.password
        })
    }


    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name", this.state.name)
        form.append("image", this.state.image)
        form.append("address", this.state.address)
        form.append("gender", this.state.gender)
        form.append("age", this.state.age)
        form.append("phone", this.state.phone)
        form.append("email", this.state.email)
        // form.append("password", this.state.password)

        axios.put(`http://localhost:8000/admin/${this.state.adminId}`, form)
            .then(response => {
                // jika proses simpan berhasil, memanggil data yang terbaru
                this.getAdmin();
                this.handleClose()
            })
            .catch(error => {
                console.log(error);
            });
    }



    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleDeleteProfile = (id) =>{
        let url = "http://localhost:8000/admin/delprof/" + id
        if (window.confirm("Are you sure to delete yout photo ptofile ?")) {
            axios.put(url)
                .then(res => {
                   this.getAdmin()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }


    componentDidMount() {
        // method yang pertama kali dipanggil pada saat load page
        this.getAdmin()
        
    }



    render() {
        return (
            <div>
                <Navbar />
                <div className="container mb-4 mt-5">

                    <div className="row mt-2">
                        <div className="col-lg-4 col-xl-3">
                            <div className="card mb-5" id="card-profile">
                                <div className="card-body">

                                    <div className="media mb-5 mt-4 ">

                                        {this.state.admin.image ? <img src={"http://localhost:8000/image/admin/" + this.state.admin.image} alt="" className='profile-img mx-auto d-block mb-2' /> : <img src="/assets/defaultprofile.jpeg" alt="" className='profile-img mx-auto d-block mb-2' />}

                                        <h4 className='display-7 fw-bold text-center'>{this.state.admin.name}</h4>
                                        <h6 className='fs-6 fw-light text-center'>{this.state.admin.level}</h6>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="card" id="loc-card">
                                                <span className='text-center mb-2'><i className="fa fa-map-marker" id="loc-icon"></i></span>
                                                <h5 className='display-7 fw-bold text-center'>{this.state.admin.address}</h5>
                                                <h6 className='fs-6 fw-light text-center mb-4'>Address</h6>
                                            </div>

                                        </div>
                                        <div className="col">
                                            <div className="card" id="loc-card">
                                                <span className='text-center mb-2'><i className="fa fa-venus-mars" id="loc-icon"></i></span>
                                                <h5 className='display-7 fw-bold text-center'>{this.state.admin.gender}</h5>
                                                <h6 className='fs-6 fw-light text-center mb-4'>Gender</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col text-center mt-4 mb-4">
                                        <input type="submit" class="btn btn-dark" value="Edit Profile" id="blue" onClick={() => this.handleEdit()} />
                                        <input type="submit" class="btn btn-dark ms-2" value="Del Photo" id="blue" onClick={() => this.handleDeleteProfile(this.state.admin.id_admin)} />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-xl-9">
                            <div className="card" id="card-profile">
                                <div className="card-body ms-3 me-3 mt-4">

                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Admin ID</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="id_admin" class="form-control" value={this.state.adminId}  />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="name" class="form-control" value={this.state.admin.name} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Phone</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="phone" class="form-control" value={this.state.admin.phone} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Gender</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="gender" class="form-control" value={this.state.admin.gender} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Address</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="address" class="form-control" value={this.state.admin.address} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Age</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="age" class="form-control" value={this.state.admin.age} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" name="email" class="form-control" value={this.state.admin.email} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" name="password" class="form-control" value={this.state.admin.password} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Input name"
                                    value={this.state.name} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" placeholder="Input address"
                                    value={this.state.address} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select type="text" name="gender" onChange={this.handleChange} >
                                    <option value={this.state.gender}>{this.state.gender}</option>
                                    <option value="P">Female</option>
                                    <option value="L">Male</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="age" placeholder="Input Age"
                                    value={this.state.age} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" placeholder="Input phonenumber" value={this.state.phone}
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="image" placeholder="Input image"
                                    onChange={this.handleFile} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={this.state.email} placeholder="Masukkan gambar"
                                    onChange={this.handleChange} />
                            </Form.Group>
                            {/* <Form.Group className="mb-2" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} placeholder="Masukkan password"
                                    onChange={this.handleChange} />
                            </Form.Group> */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" type="submit" id="blue">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>


            </div>
        );
    }
}

export default Profile;