package com.movie.search;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping; 

@Controller
public class SearchController {
	
	@RequestMapping("/search")
	public String movieList(){
		
		return "/search/movieList";
	}
}
