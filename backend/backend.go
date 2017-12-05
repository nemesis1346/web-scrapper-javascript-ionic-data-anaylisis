package main

import ("github.com/gin-gonic/gin")
/*
type DataStruct struct{
	id  string
	age  string
	location string
	musicGenre string
	name string
	profession string
}
var RawData []DataStruct
*/
//func init() { 
    // RawData = []opt{
    //     opt {
    //         shortnm: 'a', 
    //         longnm: "multiple", 
    //         needArg: false, 
    //         help: "Usage for a",
    //     },
    //     opt {
    //         shortnm: 'b', 
    //         longnm: "b-option", 
    //         needArg: false, 
    //        help: "Usage for b",
    //     },
    // )
//}
func main() {
//init()

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
