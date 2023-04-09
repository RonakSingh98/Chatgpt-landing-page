import React from "react"
const Book = (props) => {
    const  {img , title, author} = props.book; {
      return <article className='book'>
        <img src={img}/>
        <h1>{title}</h1>
        <h2>{author}</h2>
        </article>
    };
    };
export default Book