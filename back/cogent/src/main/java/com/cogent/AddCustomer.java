package com.cogent;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import com.google.gson.Gson;

public class AddCustomer extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public AddCustomer() {
        super();
    }
    @SuppressWarnings("unused")
    private class Pojo {
    	private String name;
    	private String email;
    	private String phoneNumber;
    	private String problemDesc;
    	private String serialNumber;
    	private String dateOfService;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPhoneNumber() {
			return phoneNumber;
		}
		public void setPhoneNumber(String phoneNumber) {
			this.phoneNumber = phoneNumber;
		}
		public String getProblemDesc() {
			return problemDesc;
		}
		public void setProblemDesc(String problemDesc) {
			this.problemDesc = problemDesc;
		}
		public String getSerialNumber() {
			return serialNumber;
		}
		public void setSerialNumber(String serialNumber) {
			this.serialNumber = serialNumber;
		}
		public void setDateOfService(String dateOfService) {
			this.dateOfService = dateOfService;
		}
		public String getDateOfService() {
			return dateOfService;
		}
    	
    }
 	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
 		response.addHeader("Access-Control-Allow-Methods", "POST, GET");
		response.addHeader("Access-Control-Allow-Origin", "*");
		BufferedReader reader = request.getReader();
		String jsonStr = "";
		String line;
		while((line = reader.readLine()) != null) {
			jsonStr += line;
		}
		Gson gson = new Gson();
		Pojo pojo = gson.fromJson(jsonStr, Pojo.class);
		try {
			System.out.println(jsonStr);
			writeToDB(pojo);			
			response.getWriter().append("Customer Added");
		} catch (SQLException e) {
			System.out.println(e.toString());
			response.getWriter().append(e.toString());
		} catch (Exception e) {
			System.out.print(e.toString());
		}
	}
 	protected void writeToDB(Pojo data) throws SQLException {
 		String url = "jdbc:mysql://localhost:3306/cogent?allowPublicKeyRetrieval=true&useSSL=false";
		String user = "JonDoe"; 
		String password = "12345";
 		Connection conn = DriverManager.getConnection(url, user, password);
		Statement stmt = conn.createStatement();
		String query = String.format("insert into customer (name, email, phoneNumber, problemDesc, serialNumber, dateOfService) "
				+ "values ('%s', '%s', '%s', '%s', '%s', '%s')", data.getName(), data.getEmail(), data.getPhoneNumber(), data.getProblemDesc(),
				data.getSerialNumber(), data.getDateOfService());
		stmt.executeUpdate(query);
		stmt.close();
		conn.close();
 	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
