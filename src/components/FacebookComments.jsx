import React, { useEffect } from 'react';

const FacebookComments = ({ url, numPosts, width }) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="fb-comments" 
         data-href={url} 
         data-width={width} 
         data-numposts={numPosts}>
    </div>
  );
};

export default FacebookComments;
