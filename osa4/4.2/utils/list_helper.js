const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let allLikes = 0
    blogs.forEach(element => {
        allLikes = allLikes + element.likes
    })
    return allLikes
}

module.exports = {
    dummy,
    totalLikes
}