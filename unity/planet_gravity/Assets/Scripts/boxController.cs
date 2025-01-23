using UnityEngine;

public class boxController : MonoBehaviour
{

    [SerializeField] private float speed = 5.0f;
    private Rigidbody rigidbody;
    public GameObject earth;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        rigidbody = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        float x = -Input.GetAxis("Horizontal");
        float z = -Input.GetAxis("Vertical");

        transform.Translate(x * Time.deltaTime * speed, 0, z * Time.deltaTime * speed);

        Vector3 gravity = (earth.transform.position - transform.position).normalized;

        rigidbody.AddForce(gravity * 9.8f);
    }
}
