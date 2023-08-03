const movieImages = {
    'movie1': 'jpeg',
    'movie2': 'jpeg',
    'movie3': 'jpeg',
    'movie4': 'png'
};

const movieTitles = {
    'movie1': '배드 가이즈',
    'movie2': '오즈의 마법사',
    'movie3': '라테와 마법의 돌',
    'movie4': '넛잡 땅콩 도둑들'
};

let movies = {
    'movie1': 0,
    'movie2': 0,
    'movie3': 0,
    'movie4': 0
};

let totalVotes = 0;

function getImageSrc(title) {
    return `${title}.${movieImages[title]}`;
}

function vote(movieKey, movieDiv) {
    const title = movieTitles[movieKey];
    movies[movieKey]++;
    totalVotes++;
    document.getElementById('total-votes').innerText = `총 투표수: ${totalVotes}`;
    movieDiv.querySelector('.vote-count').classList.add('hidden');
    alert(`${title}에 투표 했습니다!`);
}

function revote(movieKey) {
    const title = movieTitles[movieKey];
    movies[movieKey]++;
    document.getElementById(`revote-${movieKey}`).innerText = movies[movieKey];
    alert(`${title}에 재투표 했습니다!`);
}

function showFinalResult() {
    const resultDiv = document.getElementById('result');
    const topScore = Math.max(...Object.values(movies));
    const mostVotedMovie = Object.keys(movies).find((movie) => movies[movie] === topScore);

    resultDiv.innerHTML = `
        <h2>선택된 영화: ${movieTitles[mostVotedMovie]}</h2>
        <img src="${getImageSrc(mostVotedMovie)}" alt="${movieTitles[mostVotedMovie]}" onclick="showCelebration('${mostVotedMovie}')">
    `;

    document.querySelectorAll('.vote-count').forEach(el => el.classList.remove('hidden'));
}

function showResult() {
    document.getElementById('vote-count-movie1').innerText = `투표수: ${movies['movie1']}`;
    document.getElementById('vote-count-movie2').innerText = `투표수: ${movies['movie2']}`;
    document.getElementById('vote-count-movie3').innerText = `투표수: ${movies['movie3']}`;
    document.getElementById('vote-count-movie4').innerText = `투표수: ${movies['movie4']}`;
    const resultDiv = document.getElementById('result');
    const topScore = Math.max(...Object.values(movies));

    if (topScore === 0) {
        resultDiv.innerHTML = '<h2>아직 투표가 진행되지 않았습니다.</h2>';
        resultDiv.style.opacity = 1;
        return;
    }

    const topMovies = Object.keys(movies).filter((movie) => movies[movie] === topScore);

    if (topMovies.length === 1) {
        const mostVotedMovie = topMovies[0];
        resultDiv.innerHTML = `
            <h2>선택된 영화: ${movieTitles[mostVotedMovie]}</h2>
            <img src="${getImageSrc(mostVotedMovie)}" alt="${movieTitles[mostVotedMovie]}">
        `;
        resultDiv.style.opacity = 1;
        showCelebration(mostVotedMovie);
        return;
    }

    if (topMovies.length > 1) {
        const topMovieList = topMovies.map((movie) => `
            <div class="movie">
                <img src="${getImageSrc(movie)}" alt="${movieTitles[movie]}">
                <h3>${movieTitles[movie]}</h3>
                <div>
                    <button onclick="revote('${movie}')">투표</button>
                    <span class="revote-count hidden" id="revote-${movie}">0</span>
                </div>
            </div>
        `).join('');

        resultDiv.innerHTML = `
        <h2>재대결을 진행해 주세요!</h2>
        <div class="movie-list">${topMovieList}</div>
        <button onclick="showFinalResult()">최종 결과 보기</button>
    `;

        movies = topMovies.reduce((obj, movie) => {
            document.getElementById(`revote-${movie}`).innerText = "0";
            return { ...obj, [movie]: 0 };
        }, {});

        resultDiv.style.opacity = 1;
    }
}

function showCelebration(movieKey) {
    const resultDiv = document.getElementById('result');
    const celebrationHTML = `
        <div class="celebration">
            🎉 축하합니다! 🎉
        </div>
        <h2>${movieTitles[movieKey]}</h2>
        <img class="big-image" src="${getImageSrc(movieKey)}" alt="${movieTitles[movieKey]}">
    `;
    resultDiv.innerHTML = celebrationHTML;
}
