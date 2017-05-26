import React from 'react';

const Post = ({data, handleClick, index, linkTime, handleSave}) => (
  <div style = {{border: 1 + 'px solid black', width: 80+'%', margin: 5+'px', padding: 5+'px'}}>
      <p>Title: {data.title}</p>
      <p>Text: {data.text}</p>
      <p>Subreddit: {data.subreddit}</p>
      <p><button 
        onClick = {() => {
        handleClick(index);
      }}>
      Done Reading
      </button>
       <button 
        onClick = {() => {
        handleSave(index);
      }}>
      Save for later
      </button></p>
    <a 
      onClick ={()=> {
        openWin(data.url, linkTime)
      }}
    >
    <img src={data.url} alt={data.url + ' ||  Click to see the link. Popup will automatically close in ' + linkTime + ' seconds'} height={400} width={400}/>
    </a>
  </div>  
);

export default Post;