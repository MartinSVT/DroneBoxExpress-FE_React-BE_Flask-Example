import {Link} from 'react-router';

export default function Header() {

    return (
        <>
            <header className="base_header">
                <nav className="base_nav">
                    <div className="general_nav">
                        <Link to="/home">Home</Link>
                        <Link to="/contacts">Contacts</Link>
                        <Link to="/about">About Us</Link>
                    </div>
                    <div className="logo">
                        <Link to="/home">
                            <img className="logo_img" src='/DBE_logo.jpg'/>
                        </Link>

                        {/* <p *ngIf="isLoggedIn"> Hello {{CurrentUserData.username}}</p> */}
                        <p> Hello Guest</p>
                    </div>
                    <div className="type_nav">
                            {/* <ng-container *ngIf="isLoggedIn">
                                <ng-container *ngIf="CurrentUserData.is_staff==true"> */}
                                    <Link to="/operations">Operations</Link>
                                    <Link to="/addArticle">Add Article</Link> 
                                {/* </ng-container>  
                            </ng-container>  */}
                            {/* <ng-container *ngIf="isLoggedIn">
                                <ng-container *ngIf="!CurrentUserData.is_staff==true"> */}
                                    <Link to="/orders">Orders</Link>
                                {/* </ng-container>  
                            </ng-container>    */}
                            {/* <ng-container *ngIf="isLoggedIn">
                                <ng-container *ngIf="CurrentUserData.is_staff==true"> */}
                                    <Link to="/staffOrders">Orders</Link>
                                {/* </ng-container>  
                            </ng-container>  */}
                            <Link to="/viewProfile">Profile</Link>
                            <Link to="/logout">Logout</Link>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                    </div>
                </nav>
                <div className="prof_logo">
                    <img src="/def_prof_pic.jpg" alt=""/>
                </div>
            </header>
      </>
    )
}