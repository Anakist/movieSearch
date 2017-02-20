package com.movie.search;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping; 

@Controller
public class SearchController {
	
	private final String apiKey = "3c5d20b33d93ecb09e64fcb5ccbb0c72";
	
	@RequestMapping("/search")
	public String movieList(Model model){
		
		model.addAttribute("apiKey", apiKey);
		
		return "/search/movieList";
	}
}
