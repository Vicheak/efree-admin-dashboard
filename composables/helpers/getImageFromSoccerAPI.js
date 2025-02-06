function getImageFromSoccerAPI(imageType, size, id) {
    /*
       + The image size allowed: 18x18, 50x50, 80x80, 100x100
       + ImageType can be:
            - players
            - teams
            - tvchannels
            - bookmakers
            - leagues
            - coaches
            - referees
            - venues
        + id: Reference Table ID
    */

    const allowedSizes = [18, 50, 80, 100];
    const allowedImageTypes = [
        'players', 'teams', 'tvchannels', 'bookmakers', 
        'leagues', 'coaches', 'referees', 'venues'
    ];

    if (!allowedSizes.includes(size)) {
        throw new Error(`Invalid size provided: ${size}. Allowed sizes are: ${allowedSizes.join(', ')}`);
    }

    if (!allowedImageTypes.includes(imageType.toLowerCase())) {
        throw new Error(`Invalid image type provided: ${imageType}. Allowed types are: ${allowedImageTypes.join(', ')}`);
    }


    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new Error(`Invalid ID provided: ${id}. ID must be a string or a number.`);
    }

    const link = `https://cdn.soccersapi.com/images/soccer/${imageType.toLowerCase()}/${size}/${id}.png`;
    return link;
}

export default getImageFromSoccerAPI;
