package com.sbs.java.blog.controller;

import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HomeController extends Controller {
	public HomeController(Connection dbConn, String actionMethodName, HttpServletRequest req,
			HttpServletResponse resp) {
		super(dbConn, actionMethodName, req, resp);
	}

	@Override
	public String doAction() {
		switch (actionMethodName) {
		case "main":
			return doActionMain();
		case "aboutMe":
			return doActionAboutMe();
		case "new":
			return doActionnew();
		}

		return "";
	}

	private String doActionnew() {
		return "home/new.jsp";
	}

	private String doActionAboutMe() {
		return "home/aboutMe.jsp";
	}

	private String doActionMain() {
		return "home/main.jsp";
	}

}
