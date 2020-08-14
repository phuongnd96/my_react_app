import React from 'react';
export const RatingBar=(props)=>{
    const rating=props.rating;
    if(rating==0||rating>5){
        return(<span></span>);
    }
    if(rating==1){
        return(<span>
            <i className="fa fa-star" aria-hidden="true"></i>
        </span>
        )
    }
    if(rating==2){
        return(<span>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
        </span>)
    }
    if(rating==3){
        return(<span>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
        </span>)
    }
    if(rating==4){
        return(<span>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
        </span>)
    }
    if(rating==5){
        return(
            <span>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
        </span>
        )
    }
}