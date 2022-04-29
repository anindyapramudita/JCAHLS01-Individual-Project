import React from 'react';
import { HomeRounded, Search, SearchRounded } from '@mui/icons-material';


const NavbarComponent = (props) => {


    const [openDropdown, setOpenDropdown] = React.useState(false)

    return <div>
        {/* <div class="d-flex justify-content-between align-items-center" style={{ backgroundColor: "#134E4A" }}>
            <div className="p-3">
                <HomeRounded
                    sx={{ color: "white" }}
                    fontSize="large"
                />
            </div>
            <div className='p-2 d-flex justify-content-end align-items-center'>
                <div className="p-2">
                    <h6 style={{ color: "white" }}>Username</h6>
                </div>
                <div className="p-2">
                    <img
                        src="https://external-preview.redd.it/-By7bUqncmznnA4tdfBQbiYBinN_7joIqL7Y64R7hMo.png?format=pjpg&auto=webp&s=3e0a96ba6c590f008b8d88da4b719bd9e60fd363"
                        className="rounded-circle"
                        style={{ width: "40px" }}
                    />
                </div>
            </div>
        </div> */}


        <nav class="d-flex justify-content-between align-items-center" style={{ borderBottom: "solid", borderBottomColor: "lightGray" }}>
            <div className="p-3">
                <HomeRounded
                    sx={{ color: "#134E4A" }}
                    fontSize="large"
                />
            </div>
            <div className='p-2 d-flex justify-content-end align-items-center'>
                <div className="p-2">
                    <h6 style={{ color: "#134E4A" }}>Username</h6>
                </div>
                <div className="p-2">
                    <img
                        src="https://external-preview.redd.it/-By7bUqncmznnA4tdfBQbiYBinN_7joIqL7Y64R7hMo.png?format=pjpg&auto=webp&s=3e0a96ba6c590f008b8d88da4b719bd9e60fd363"
                        className="rounded-circle"
                        style={{ width: "40px" }}
                    />
                </div>
            </div>
        </nav>


        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={{}}>
                Dropdown button
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>




    </div >
}

export default NavbarComponent;