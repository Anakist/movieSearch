package com.movie.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.movie.domain.Movie;

@Repository
public interface TestMovieRepository extends JpaRepository<Movie, Long> {
	
	@Query("SELECT m from Movie m WHERE m.id = :id")
	public Movie findAllById(@Param("id") Long id);
	@Query("SELECT m from Movie m WHERE m.movieId = :movieId")
	public Movie findByMovieId(@Param("movieId") String movieId);
	
	@Query("SELECT m from Movie m ")
	public List<Movie> findAll();
	
	// movieId정렬
//		@Query("SELECT m from Movie m ORDER BY m.movieId ASC")
//		public List<Movie> findAllByMovieIdByAsc();
		public List<Movie> findAllByOrderByMovieIdAsc();
//		@Query("SELECT m from Movie m ORDER BY m.movieId DESC")
//		public List<Movie> findAllByMovieIdByDesc();
		public List<Movie> findAllByOrderByMovieIdDesc();
		
		// keyword정렬
//		@Query("SELECT m from Movie m ORDER BY m.keyword ASC")
//		public List<Movie> findAllByKeywordByAsc();
		public List<Movie> findAllByOrderByKeywordAsc();
//		@Query("SELECT m from Movie m ORDER BY m.keyword DESC")
//		public List<Movie> findAllByKeywordByDesc();
		public List<Movie> findAllByOrderByKeywordDesc();
		
		// title정렬
//		@Query("SELECT m from Movie m ORDER BY m.title ASC")
//		public List<Movie> findAllByTitleByAsc();
		public List<Movie> findAllByOrderByTitleAsc();
//		@Query("SELECT m from Movie m ORDER BY m.title DESC")
//		public List<Movie> findAllByTitleByDesc();
		public List<Movie> findAllByOrderByTitleDesc();
		
		// grades정렬
//		@Query("SELECT m from Movie m ORDER BY m.grades ASC")
//		public List<Movie> findAllByGradesByAsc();
		public List<Movie> findAllByOrderByGradesAsc();
//		@Query("SELECT m from Movie m ORDER BY m.grades DESC")
//		public List<Movie> findAllByGradesByDesc();
		public List<Movie> findAllByOrderByGradesDesc();
		
		// year정렬
//		@Query("SELECT m from Movie m ORDER BY m.year ASC")
//		public List<Movie> findAllByYearByAsc();
		public List<Movie> findAllByOrderByYearAsc();
//		@Query("SELECT m from Movie m ORDER BY m.year DESC")
//		public List<Movie> findAllByYearByDesc();
		public List<Movie> findAllByOrderByYearDesc();
}
