package com.movie.favorite;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.movie.domain.Movie;
import com.movie.repository.TestMovieRepository;
import com.movie.search.TestSearchController; 

@RunWith(SpringRunner.class)
@DataJpaTest
public class TestFavoriteController {
	
	private static final Logger LOG = LoggerFactory.getLogger(TestSearchController.class);
	
	@Autowired
	private TestMovieRepository tRepositTory;
	
	private Movie movie;
	
	@Before
	public void onBefore() throws Exception {
		System.out.println(">>>>> on Before START");
		movie = new Movie();
		movie.setMovieId("1000");
		movie.setKeyword("미생");
		movie.setTitle("미생제목");
		movie.setGrades("4.5");
		movie.setYear("2000");
		movie.setStory("미생 스토리");
		movie.setActor("배우1, 배우2, 배우3");
		movie.setDirector("미생감독");
		
		LOG.debug("LOG LEVEL DEBUG");
		LOG.info("LOG LEVEL INFO");
		LOG.error("LOG LEVEL ERROR");
		
		tRepositTory.save(movie);
		System.out.println(">>>>> on Before END");
	}
	
	@Test
	public void testList() throws Exception {
		List<Movie> movieList = this.tRepositTory.findAll();
		System.out.println(">>>>> testList movieList.get(0).getTitle() : " + movieList.get(0).getTitle());
		
		assertThat(movieList.get(0).getTitle()).isEqualTo("미생제목");
		
	}
	
	@Test
	public void testOrderBy() throws Exception {
		movie = new Movie();
		movie.setMovieId("1002");
		movie.setKeyword("미생2");
		movie.setTitle("미생제목2");
		movie.setGrades("4.0");
		movie.setYear("2002");
		movie.setStory("미생 스토리2");
		movie.setActor("배우1, 배우2, 배우3");
		movie.setDirector("미생감독");
		
		tRepositTory.save(movie);
		
		List<Movie> mList = tRepositTory.findAll(new Sort(Sort.Direction.ASC));
		List<Movie> aList = mList.stream().sorted(Comparator.comparing(Movie::getId)).collect(Collectors.toList());

		// stream 생성
		aList.stream().filter(m -> {
			// 중개연산
			System.out.println(">>>>> testOrderBy filter : " + m.getTitle());
			return true;
		})
		.forEach(s -> System.out.println("forEach : " + s.getTitle()));
		// stream 종단
		
//		List<Movie> dList = mList.stream().sorted(Comparator.comparing(Movie::getId).reversed()).collect(Collectors.toList());
		List<Movie> dList = tRepositTory.findAllByOrderByMovieIdAsc();
		
		dList.stream().filter(m -> {
			System.out.println(">>>>> testOrderBy Param filter : " + m.getTitle());
			return true;
		})
		.forEach(s -> System.out.println("forEach : " + s.getTitle()));
	}
	
	@Test
	public void testAdd() throws Exception {
		movie = new Movie();
		movie.setMovieId("1002");
		movie.setKeyword("미생2");
		movie.setTitle("미생제목2");
		movie.setGrades("4.0");
		movie.setYear("2002");
		movie.setStory("미생 스토리2");
		movie.setActor("배우1, 배우2, 배우3");
		movie.setDirector("미생감독");
		
		Movie movieMap = this.tRepositTory.findByMovieId("1000");
		
		if( movieMap != null ) {
			System.out.println("" + movieMap.toString());
		} else {
			System.out.println("NULL");
			tRepositTory.save(movie);
		}
		
//		// stream 생성
//		movieList.stream().filter(m -> {
//			// 중개연산
//			System.out.println(">>>>> testAdd filter : " + m.getTitle());
//			return true;
//		})
//		.forEach(s -> System.out.println("forEach : " + s.getTitle()));
//		// stream 종단
	}
	
	@Test
	public void testDel() throws Exception {
//		Movie movieMap = this.tRepositTory.findOne(0L);
		Movie movieMap = this.tRepositTory.findAllById(1L);
		//assertThat(movieList.size()).isGreaterThan(0);
		
		if( movieMap != null ) {
			
			System.out.println("movieMap : " + movieMap.getTitle());
			tRepositTory.delete(1L);
		} else {
			System.out.println("NULL");
		}
		
	}
}
