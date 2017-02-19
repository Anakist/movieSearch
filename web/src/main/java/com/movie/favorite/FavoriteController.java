package com.movie.favorite;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.movie.domain.Movie;
import com.movie.repository.MovieRepository;

/**
 * 북마크 Controller
 * 
 * @author	조항욱
 *
 */
@Controller
public class FavoriteController {
	
	private static final Logger LOG = LoggerFactory.getLogger(FavoriteController.class);
	
	@Autowired
	private MovieRepository movieRepository;
	
	/**
	 * 북마크 List
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping("/list")
	@Transactional
	public String list(Model model){
		List<Movie> mList = movieRepository.findAll();
		
		if( LOG.isInfoEnabled() ) {
			// stream 생성
			mList.stream().filter(m -> {
				// 중개연산
				LOG.info(">>>>> testOrderBy filter : " + m.getTitle());
				return true;
			})
			.forEach(s -> LOG.info("forEach : " + s.getTitle()));
			// stream 종단
		}
		
		model.addAttribute("movieList", mList);
		
		return "favorite/list";
	}
	
	/**
	 * 북마크 추가
	 * 
	 * @param movie
	 * @return
	 */
	@PostMapping("/add")
	@Transactional
	public @ResponseBody Map<String, Object> add(@ModelAttribute Movie movie) {
		Map<String, Object> retMap = new HashMap<String, Object>();
		
		Movie addMovie = movieRepository.findByMovieId(movie.getMovieId());
		
		try{
			if( addMovie != null) {
				retMap.put("errCd", "10");
				retMap.put("errMsg", "해당 영화는 이미 북마크 되어있습니다.");
			} else {
				movieRepository.save(movie);
				retMap.put("errCd", "0");
				retMap.put("errMsg", "SUCCESS");
			}
			
		}catch (Exception e) {
			retMap.put("errCd", "99");
			retMap.put("errMsg", "북마크 추가중 오류가 발생했습니다.");
			retMap.put("errEtc", e.getMessage());
		}
		return retMap;
	}
	
	/**
	 * 북마크 조건정렬
	 * 
	 * @param model
	 * @param ctg
	 * @param ord
	 * @return
	 */
	@RequestMapping("/order")
//	@PostMapping("/order")
	@Transactional
	public String orderBy(Model model, @RequestParam("ctg") String ctg, @RequestParam("ord") String ord){
		List<Movie> mList = new ArrayList<Movie>();
		
		ctg = ctg.toLowerCase(Locale.ENGLISH);
		ord = ord.toLowerCase(Locale.ENGLISH);
		
		// TODO : Dynamic Query.....
		if( "movieId".equals(ctg) && "asc".equals(ord) ) mList = movieRepository.findAllByMovieIdByAsc();
		if( "movieId".equals(ctg) && "desc".equals(ord) ) mList = movieRepository.findAllByMovieIdByAsc();
		if( "grade".equals(ctg) && "asc".equals(ord) ) mList = movieRepository.findAllByGradesByAsc();
		if( "grade".equals(ctg) && "desc".equals(ord) ) mList = movieRepository.findAllByGradesByDesc();
		if( "title".equals(ctg) && "asc".equals(ord) ) mList = movieRepository.findAllByTitleByAsc();
		if( "title".equals(ctg) && "desc".equals(ord) ) mList = movieRepository.findAllByTitleByDesc();
		if( "year".equals(ctg) && "asc".equals(ord) ) mList = movieRepository.findAllByYearByAsc();
		if( "year".equals(ctg) && "desc".equals(ord) ) mList = movieRepository.findAllByYearByDesc();
		
//		mList.stream().sorted(Comparator.comparing(Movie::getId).reversed()).collect(Collectors.toList());
		
		if( LOG.isInfoEnabled() ) {
			// stream 생성
			mList.stream().filter(m -> {
				// 중개연산
				LOG.info(">>>>> testOrderBy filter : " + m.getTitle());
				return true;
			})
			.forEach(s -> LOG.info("forEach : " + s.getTitle()));
			// stream 종단
		}
		
		model.addAttribute("movieList", mList);
		
		return "favorite/list";
	}
	
	/**
	 * 북마크 삭제
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/del")
	@ResponseBody
	@Transactional
	public Map<String, Object> del(@PathVariable Long id) {
		Movie movieMap = this.movieRepository.findOne(id);
		Map<String, Object> retMap = new HashMap<String, Object>();
		
		if( movieMap != null ) {
			movieRepository.delete(id);
			retMap.put("errCd", "0");
			retMap.put("errMsg", "SUCCESS");
		} else {
			retMap.put("errCd", "10");
			retMap.put("errMsg", "삭제하려는 북마크가 존재하지 않습니다.");
		}
		
		movieRepository.delete(id);
		
		return retMap;
	}
}