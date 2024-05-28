import React, { useState } from 'react';

function CommentContentBox({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getShortContent = (content) => {
    const words = content.split(" ");
    if (words.length > 60) {
      return words.slice(0, 60).join(" ") + "...";
    }
    return content;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="comment-content">
      <p>{isExpanded ? content : getShortContent(content)}</p>
      {content.split(" ").length > 30 && (
        <span style={{ cursor:'pointer',color:'blue',textDecoration: 'underline'  }} onClick={toggleExpand}>
          {isExpanded ? "Thu gọn -" : "Xem thêm +"}
        </span>
      )}
    </div>
  );
}

export default CommentContentBox;