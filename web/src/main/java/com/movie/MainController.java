package com.movie;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping; 

@Controller
public class MainController {
	
//	@RequestMapping("/")
//	@ResponseBody
//	public String home() {
//		return "hello Spring Boots";
//	}
	
	@RequestMapping("/")
	public String main() {
		
		return "main";
	}
}
