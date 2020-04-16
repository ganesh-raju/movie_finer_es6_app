

class Movie{
    constructor(crawled_at, description, title, url, poster, produced_by, directed_by ){
        this.crawled_at = crawled_at;
        this.title = title;
        this.description = description;
        this.url = url;
        this.poster = poster;
        this.produced_by = produced_by;
        this.directed_by = directed_by;
    }
}

class DispalyMovies{
    display(movie){
       let row = document.querySelector("#movies_list")
       let div = document.createElement("div")
       div.className = "col-md-3"
       div.innerHTML = 
       `
            <img src=${movie.poster} alt="" class="img-responsive" id="grid_view">
            <br>
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h2 class="panel-title" id="movie_title">${movie.title}</h2>
                </div>
                <div class="panel-body">
                    Director: <span id="director">${movie.directed_by}</span>
                </div>
            </div>
        `
        row.appendChild(div);
    }
}

class LoadArray{
    moviesArray(movies_list, title=""){
        var ark = movies_list;
       
        if (title != ""){
        
            var ark = movies_list.filter(res => {
                return res.title.includes(title)
            })
            
        }

        console.log(ark);
        ark.map((res) => {
            const movie_intializer = new Movie(res.crawled_at, res.description, res.title, res.url, res.poster, res.produced_by, res.directed_by);
            const mv = new DispalyMovies();
            mv.display(movie_intializer);
        });
        
        
    }

    filterResult(title){
        console.log(title);
    }
}

document.getElementById("search_form").addEventListener("submit", function(e){
    
        const search_value = document.getElementById("search_value").value;
        console.log(search_value);
        fetch("../configs/movies.json")
            .then(res => res.json())
            .then((out) => {
                const movies = new LoadArray();
                movies.moviesArray(out, search_value);
            })
            .catch(err => { throw err });
    e.preventDefault();
});






