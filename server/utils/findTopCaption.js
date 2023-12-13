const findTopCaption = (captions) => {
    let topCaption = captions[0];
    captions.forEach(caption => {
        if(caption.votes > topCaption.votes){
            topCaption = caption;
        };
    });

    return topCaption;
};


module.exports = findTopCaption;