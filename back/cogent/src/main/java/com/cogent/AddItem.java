package com.cogent;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.google.gson.Gson;

public class AddItem extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public AddItem() {
        super();
    }
    
    @SuppressWarnings("unused")
    private class Pojo {
    	private int count;
    	private String itemName;
    	private String itemCode;
    	private String specs;
    	
		public int getCount() {
			return count;
		}
		public void setCount(int count) {
			this.count = count;
		}
		public String getItemName() {
			return itemName;
		}
		public void setItemName(String itemName) {
			this.itemName = itemName;
		}
		public String getItemCode() {
			return itemCode;
		}
		public void setItemCode(String itemCode) {
			this.itemCode = itemCode;
		}
		public String getSpecs() {
			return specs;
		}
		public void setSpecs(String specs) {
			this.specs = specs;
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
//		System.out.println(jsonStr);
		try {
			writeToDB(pojo);			
			response.getWriter().append("Item Added");
		} catch (SQLException e) {
			System.out.println(e.toString());
			response.getWriter().append(e.toString());
		} catch (Exception e) {
			System.out.print(e.toString());
		}
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
	private void writeToDB(Pojo data) throws SQLException {
		String str = "";
		String url = "jdbc:mysql://localhost:3306/cogent?allowPublicKeyRetrieval=true&useSSL=false";
		String user = "JonDoe"; 
		String password = "12345";
 		Connection conn = DriverManager.getConnection(url, user, password);
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery(String.format("select itemName from inventory where itemCode = '%s'", data.getItemCode()));
		if(rs.next() == false) {
			str = String.format("insert into inventory (itemName, itemCode, specifications, count) values ('%s', '%s', '%s', %s)", data.getItemName(), data.getItemCode(), data.getSpecs(), data.getCount());			
		} else {
			str = String.format("update inventory set count = count + %s where itemCode = '%s'", data.getCount(), data.getItemCode());
		}
		stmt.executeUpdate(str);
	}
}