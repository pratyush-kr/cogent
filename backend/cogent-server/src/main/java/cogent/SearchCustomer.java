package cogent;

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
import java.util.ArrayList;
import com.google.gson.Gson;

public class SearchCustomer extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@SuppressWarnings("unused")
	private class Pojo {
		private String serialNumber;
		private String dateOfService;
		public String getSerialNumber() {
			return serialNumber;
		}
		public void setSerialNumber(String serialNumber) {
			this.serialNumber = serialNumber;
		}
		public String getDateOfService() {
			return dateOfService;
		}
		public void setDateOfService(String dateOfService) {
			this.dateOfService = dateOfService;
		}
	}
	@SuppressWarnings("unused")
	private class Customer {
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
	
	public SearchCustomer() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Methods", "POST, GET");
		response.addHeader("Access-Control-Allow-Origin", "*");
		String line;
		String jsonStr = "";
		BufferedReader br = request.getReader();
		while((line = br.readLine()) != null) {
			jsonStr += line;
		}
		Gson gson = new Gson();
		Pojo pojo = gson.fromJson(jsonStr, Pojo.class);
		ArrayList<Customer> array = new ArrayList<Customer>(); 
		try {
			array = search(pojo);
			jsonStr = gson.toJson(array);
			response.getWriter().append(jsonStr);
		} catch (SQLException e) {
			response.getWriter().append(e.toString());			
		}
		
	}
	
	private ArrayList<Customer> search(Pojo data) throws SQLException {
		ArrayList<Customer> array = new ArrayList<Customer>();
		String url = "jdbc:mariadb://localhost:3306/cogent";
		String user = "cogent"; 
		String password = "12345";
		Connection conn = DriverManager.getConnection(url, user, password);
		Statement stmt = conn.createStatement();
		String query1 = "select * from Customer where serialNumber like '%";
		String query2 = String.format("%s' and dateOfService like ", data.getSerialNumber()) + "'%";
		String query3 = data.getDateOfService()+"'";
		String query = query1 + query2 + query3;
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()) {
			Customer cdata = new Customer();
			cdata.setName(rs.getString(1));
			cdata.setEmail(rs.getString(2));
			cdata.setPhoneNumber(rs.getString(3));
			cdata.setProblemDesc(rs.getString(4));
			cdata.setSerialNumber(rs.getString(5));
			cdata.setDateOfService(rs.getString(6));
			array.add(cdata);
		}
		return array;
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}