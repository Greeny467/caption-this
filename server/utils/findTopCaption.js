const findTopCaption = (captions) => {
    let topCaption = captions[0];
    captions.forEach(caption => {
        if(caption.likes > topCaption.likes){
            topCaption = caption;
        };
    });

    return topCaption;
};


module.exports = findTopCaption;