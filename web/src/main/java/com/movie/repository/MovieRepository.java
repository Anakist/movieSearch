package com.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.movie.domain.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>  {
	
	@Query("SELECT m from Movie m WHERE m.id = :id")
	public Movie findAllById(@Param("id") Long id);
	@Query("SELECT m from Movie m WHERE m.movieId = :movieId")
	public Movie findByMovieId(@Param("movieId") String movieId);
	
	@Query("SELECT m from Movie m ")
	public List<Movie> findAll();
	
	// movieId정렬
	@Query("SELECT m from Movie m ORDER BY m.movieId ASC")
	public List<Movie> findAllByMovieIdByAsc();
	@Query("SELECT m from Movie m ORDER BY m.movieId DESC")
	public List<Movie> findAllByMovieIdByDesc();
	
	// title정렬
	@Query("SELECT m from Movie m ORDER BY m.title ASC")
	public List<Movie> findAllByTitleByAsc();
	@Query("SELECT m from Movie m ORDER BY m.title DESC")
	public List<Movie> findAllByTitleByDesc();
	
	// grades정렬
	@Query("SELECT m from Movie m ORDER BY m.grades ASC")
	public List<Movie> findAllByGradesByAsc();
	@Query("SELECT m from Movie m ORDER BY m.grades DESC")
	public List<Movie> findAllByGradesByDesc();
	
	// year정렬
	@Query("SELECT m from Movie m ORDER BY m.year ASC")
	public List<Movie> findAllByYearByAsc();
	@Query("SELECT m from Movie m ORDER BY m.year DESC")
	public List<Movie> findAllByYearByDesc();
	
}
